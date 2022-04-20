import { createContext, useContext, useMemo } from "react";
import styled from "styled-components";

// types
import type {
  CollegeData,
  ParsedTestData,
  CollegeResults,
} from "../../types/college";
import { mergeCollegeResults } from "../../utils/naviance";

const CollegeDataContext = createContext<CollegeData>({} as CollegeData);

export default function StandardizedTestRangeCounts({
  data,
  percentileInterval,
}: {
  data: CollegeData;
  percentileInterval: number;
}) {
  const ranges = useMemo(
    () => generatePercentileRanges(percentileInterval),
    [percentileInterval]
  );

  return (
    <CollegeDataContext.Provider value={data}>
      <h2>Counts</h2>
      <RangeCountsTable>
        <thead>
          <tr>
            <th>Percentile Range</th>
            <th>Accepted SAT</th>
            <th>Accepted ACT</th>
            <th>Denied SAT</th>
            <th>Denied ACT</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ranges.map((range) => (
            <PercentileRangeCountRow
              key={range[0] + ":" + range[1]}
              range={range}
              data={data}
            />
          ))}
          <TotalsRow data={data} />
        </tbody>
      </RangeCountsTable>
    </CollegeDataContext.Provider>
  );
}

function PercentileRangeCountRow({
  range,
  data: { data },
}: {
  range: number[];
  data: CollegeData;
}) {
  // data within the given range
  const rangeData: CollegeResults | null = useMemo(
    () => (data ? filterDataByRange(data, range) : null),
    [data, range]
  );

  // row total
  const rowTotal = useMemo(
    () => (rangeData ? rangeData.accepted.length + rangeData.denied.length : 0),
    [rangeData]
  );

  return (
    <tr>
      <td>{getPercentileRangeString(range)}</td>
      {rangeData ? (
        <>
          {/* Accepted SAT */}
          <PercentileRangeCountRowCell
            categoryData={rangeData.accepted}
            testName="sat"
          />
          {/* Accepted ACT */}
          <PercentileRangeCountRowCell
            categoryData={rangeData.accepted}
            testName="act"
          />
          {/* Denied SAT */}
          <PercentileRangeCountRowCell
            categoryData={rangeData.denied}
            testName="sat"
          />
          {/* Denied ACT */}
          <PercentileRangeCountRowCell
            categoryData={rangeData.denied}
            testName="act"
          />
          {/* Row Total */}
          <td>
            <strong>{rowTotal}</strong>
          </td>
        </>
      ) : (
        <td colSpan={5}>No data</td>
      )}
    </tr>
  );

  // return (
  //   <>
  //     <h3>{getPercentileRangeString(range)}</h3>
  //     {rangeData ? (
  //       <ul>
  //         <li>Accepted: {rangeData.accepted.length}</li>
  //         <li>Denied: {rangeData.denied.length}</li>
  //         <li>Unknown: {rangeData.unknown.length}</li>
  //       </ul>
  //     ) : (
  //       "No Data"
  //     )}
  //   </>
  // );
}

function PercentileRangeCountRowCell({
  categoryData,
  testName,
}: {
  categoryData: ParsedTestData[];
  testName: "sat" | "act";
}) {
  const { data } = useContext(CollegeDataContext);

  const overallTotal = useMemo(
    () => (data ? data.accepted.length + data.denied.length : 0),
    [data]
  );

  return (
    <td>
      {/* test count (see getTestCount) */}
      {getTestCount(categoryData, testName)}{" "}
      {/* expected count: test category divided by two */}(
      {data ? categoryData.length / overallTotal : "??"})
    </td>
  );
}

function TotalsRow({ data: { data } }: { data: CollegeData }) {
  return (
    <TotalsRowTr>
      <td>Total</td>
      {data ? (
        <>
          {/* Accepted SAT */}
          <td>{getTestCount(data.accepted, "sat")}</td>
          {/* Accepted ACT */}
          <td>{getTestCount(data.accepted, "act")}</td>
          {/* Denied SAT */}
          <td>{getTestCount(data.denied, "sat")}</td>
          {/* Denied SAT */}
          <td>{getTestCount(data.denied, "act")}</td>
          {/* Overall Total */}
          <td>{data.accepted.length + data.denied.length}</td>
        </>
      ) : (
        <td colSpan={5}>No data</td>
      )}
    </TotalsRowTr>
  );
}

function getTestCount(data: ParsedTestData[], testName: "sat" | "act") {
  return data.filter((datum) => datum.test === testName).length;
}

function filterDataByRange(
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

function groupDataByExpectedCount(data: CollegeResults): CollegeResults[] {
  let groupedData: CollegeResults[] = [];

  let currentGroup: CollegeResults = { accepted: [], denied: [], unknown: [] };
  for (let x = 100; x > 0; x -= 2) {
    // merge current group and data in percentile range
    currentGroup = mergeCollegeResults([
      currentGroup,
      filterDataByRange(data, [x, x - 1]),
    ]);

    if (true) {
      // add group data to array
      groupedData.push(currentGroup);

      // clear current group
      currentGroup = { accepted: [], denied: [], unknown: [] };
    }
  }

  return groupedData;
}

function verifyExpectedCountsGreaterThanFive(
  collegeData: CollegeData,
  rowResults: CollegeResults
): boolean {
  // const rowTotal =
  //   rowResults.accepted.length +
  //   rowResults.denied.length +
  //   rowResults.unknown.length;

  return true;
}

function generatePercentileRanges(interval: number): number[][] {
  let x = 100;
  let percentiles = [];

  while (x > 0) {
    // percentiles.push([x === 100 ? x : x - 1, x - interval]);
    percentiles.push([x - interval, x === 100 ? x : x - 1]);
    x -= interval;
  }

  return percentiles;
}

function getPercentileRangeString(range: number[]) {
  return `${range[0]}th - ${range[1]}th Percentiles`;
}

const RangeCountsTable = styled.table`
  border-collapse: collapse;
  &,
  & th,
  & td {
    border: 1px solid #000;
  }

  & th,
  & td {
    padding: 5px;
  }
`;

const TotalsRowTr = styled.tr`
  font-weight: 700;
`;
