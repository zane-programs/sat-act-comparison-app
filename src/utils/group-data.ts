// types
import type { CollegeResults, ParsedTestData } from "../types/college";
import type { Matrix } from "./matrix";

// utils
import { createMatrix } from "./matrix";
import { mergeCollegeResults } from "./naviance";

// CONSTANT order of columns for the matrices
const MATRIX_COLUMN_ORDER: ["accepted" | "denied", "sat" | "act"][] = [
  ["accepted", "sat"],
  ["accepted", "act"],
  ["denied", "sat"],
  ["denied", "act"],
];

export function createObservedAndExpectedMatrices(data: CollegeResults): {
  observed: Matrix;
  expected: Matrix;
} {
  // group data by expected count, such that every
  // cell has an expected count >= 5
  const groupedData = groupDataByExpectedCount(data);

  // create matrices for observed and expected
  // (rows = length of groupedData, columns =
  // 4 [accepted SAT, accepted ACT, denied SAT,
  // denied ACT])
  const observed = createMatrix(groupedData.length, MATRIX_COLUMN_ORDER.length);
  const expected = createMatrix(groupedData.length, MATRIX_COLUMN_ORDER.length);

  groupedData.forEach((row, i) => {
    for (let j = 0; j < observed[0].length; j++) {
      // OBSERVED: get test count for cell
      observed[i][j] = getTestCount(
        row, // row data
        MATRIX_COLUMN_ORDER[j][0], // "accepted" | "denied"
        MATRIX_COLUMN_ORDER[j][1] // "sat" | "act"
      );

      // EXPECTED: calculate expected count for cell
      expected[i][j] = calculateExpectedCount(
        row, // row data
        MATRIX_COLUMN_ORDER[j][0], // "accepted" | "denied"
        MATRIX_COLUMN_ORDER[j][1] // "sat" | "act"
      );
    }
  });

  return { observed, expected };
}

export function groupDataByExpectedCount(
  data: CollegeResults
): CollegeResults[] {
  let groupedData: CollegeResults[] = [];

  let currentGroup: CollegeResults = { accepted: [], denied: [], unknown: [] };
  for (let x = 100; x > 0; x -= 2) {
    // merge current group and data in percentile range
    currentGroup = mergeCollegeResults([
      currentGroup,
      filterDataByRange(data, [x, x - 1]),
    ]);

    // make sure that all expected counts are greater than or equal to 5
    if (verifyExpectedCountsGreaterThanOrEqualToFive(currentGroup)) {
      // add group data to array
      groupedData.push(currentGroup);

      // clear current group
      currentGroup = { accepted: [], denied: [], unknown: [] };
    }
  }

  // add leftover data in currentGroup to the last group
  groupedData[groupedData.length - 1] = mergeCollegeResults([
    groupedData[groupedData.length - 1],
    currentGroup,
  ]);

  return groupedData;
}

export function getTestCount(
  rangeData: CollegeResults,
  category: "accepted" | "denied",
  testName: "sat" | "act"
) {
  return rangeData[category].filter((datum) => datum.test === testName).length;
}

export function filterDataByRange(
  { accepted, denied, unknown }: CollegeResults,
  range: number[]
): CollegeResults {
  return {
    accepted: _filterDataByRangeInternal(accepted, range),
    denied: _filterDataByRangeInternal(denied, range),
    unknown: _filterDataByRangeInternal(unknown, range),
  };
}

function _filterDataByRangeInternal(
  dataList: ParsedTestData[],
  range: number[]
): ParsedTestData[] {
  return dataList.filter(
    ({ percentile }) =>
      percentile <= Math.max(...range) && percentile >= Math.min(...range)
  );
}

export function verifyExpectedCountsGreaterThanOrEqualToFive(
  rangeData: CollegeResults
): boolean {
  // calculate expected counts for both SAT and ACT,
  // both accepted and denied
  const expectedAcceptedSAT = calculateExpectedCount(
    rangeData,
    "accepted",
    "sat"
  );
  const expectedAcceptedACT = calculateExpectedCount(
    rangeData,
    "accepted",
    "act"
  );
  const expectedDeniedSAT = calculateExpectedCount(rangeData, "denied", "sat");
  const expectedDeniedACT = calculateExpectedCount(rangeData, "denied", "act");

  // all expected counts must be >= 5
  return (
    expectedAcceptedSAT >= 5 &&
    expectedAcceptedACT >= 5 &&
    expectedDeniedSAT >= 5 &&
    expectedDeniedACT >= 5
  );
}

export function calculateExpectedCount(
  rangeData: CollegeResults,
  category: "accepted" | "denied",
  testName: "sat" | "act"
): number {
  // data for category (accepted or denied)
  const categoryData = rangeData[category];
  // total number of tests in given results range
  const rangeTotal = rangeData.accepted.length + rangeData.denied.length;

  // total number of standardized tests by given name
  // see category parameter ("sat" or "act")
  const totalStandardizedTestsByName =
    getTestCount(rangeData, "accepted", testName) +
    getTestCount(rangeData, "denied", testName);

  // rate for this category (accept or deny)
  const categoryAcceptOrDenyRate =
    rangeTotal === 0 ? 0 : categoryData.length / rangeTotal;

  // expected count: total SATs or ACTs multiplied by
  // accept or deny rate for this category
  return totalStandardizedTestsByName * categoryAcceptOrDenyRate;
}
