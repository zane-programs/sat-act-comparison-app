import type { ParsedTestData, CollegeData } from "./types/college";
import type {
  GPAData,
  ScrapedNavianceDatum,
  StandardizedTestData,
} from "./types/naviance";
import { getPercentileFromData, satData, actData } from "./utils/naviance";

const SCORE_KEYS: {
  // [key: string]: "studentSAT1600Composite" | "actComposite";
  [key: string]: "highestComboSat" | "actComposite";
} = {
  // sat: "studentSAT1600Composite",
  sat: "highestComboSat",
  act: "actComposite",
};

export function convertScrapedDataToCollegeDataFormat(
  scrapedData: ScrapedNavianceDatum[]
): CollegeData[] {
  return scrapedData.map(({ name, uuid, data: { scattergrams } }) => {
    // TODO: Check if gpa and weightedGpa are different
    const gpaData = scattergrams?.weightedGpa;

    const finalData = gpaData
      ? sortParsedTestData(parseGpaData(gpaData))
      : null;

    return { name, uuid, data: finalData };
  });
}

// export const collegeData =
//   convertScrapedDataToCollegeDataFormat(__NAVIANCE_DATA__);

function parseGpaData(gpaData: GPAData) {
  // parse sat and act data separately
  const sat = gpaData?.sat ? parseTestData(gpaData.sat, "sat") : null;
  const act = gpaData?.act ? parseTestData(gpaData.act, "act") : null;

  // combine the the data
  return [...(sat || []), ...(act || [])];
}

function parseTestData(
  { apps: applications }: StandardizedTestData,
  testType: "sat" | "act"
) {
  // keys in the JSON for the test score
  // (different for SAT and ACT)
  const scoreKey = SCORE_KEYS[testType];
  // percentile data for converting raw scores
  const percentileData = testType === "sat" ? satData : actData;

  let testData: ParsedTestData[] = [];

  Object.keys(applications).forEach((statusCode) => {
    applications[statusCode]?.forEach((application) => {
      testData.push({
        test: testType, // "sat" | "act"
        status: statusCode, // "deniedEA", "deniedRD", etc.
        gpa: application.gpa, // (weighted)
        rawScore: application[scoreKey], // raw sat or act
        // test converted to percentile
        percentile: getPercentileFromData(
          percentileData,
          application[scoreKey]
        ),
      });
    });
  });

  return testData;
}

function sortParsedTestData(data: ParsedTestData[]) {
  let accepted: ParsedTestData[] = [];
  let denied: ParsedTestData[] = [];
  let unknown: ParsedTestData[] = [];

  data.forEach((datum) => {
    const normalizedStatus = datum.status.toLowerCase();

    if (normalizedStatus.indexOf("accepted") !== -1) {
      // accepted status
      accepted.push(datum);
    } else if (normalizedStatus.indexOf("denied") !== -1) {
      // denied (rejected) status
      denied.push(datum);
    } else {
      // we don't know, so file as unknown
      unknown.push(datum);
    }
  });

  return { accepted, denied, unknown };
}
