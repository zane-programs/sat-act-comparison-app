import type {
  CollegeData,
  CollegeResults,
  ParsedTestData,
} from "../types/college";
import type { ScatterData } from "plotly.js";

export type PercentileData = { [key: number | string]: number };

// Data source:
// https://www.act.org/content/dam/act/unsecured/documents/MultipleChoiceStemComposite.pdf

export const actData: PercentileData = {
  "1": 1,
  "2": 1,
  "3": 1,
  "4": 1,
  "5": 1,
  "6": 1,
  "7": 1,
  "8": 1,
  "9": 1,
  "10": 1,
  "11": 2,
  "12": 5,
  "13": 10,
  "14": 16,
  "15": 22,
  "16": 28,
  "17": 35,
  "18": 41,
  "19": 47,
  "20": 53,
  "21": 59,
  "22": 64,
  "23": 70,
  "24": 74,
  "25": 78,
  "26": 82,
  "27": 85,
  "28": 88,
  "29": 90,
  "30": 93,
  "31": 95,
  "32": 96,
  "33": 98,
  "34": 99,
  "35": 99,
  "36": 100,
};

// Data source:
// https://satsuite.collegeboard.org/media/pdf/understanding-sat-scores.pdf
// (see "SAT User" column on page 7)
// 99+: 100
// 1-: 0

export const satData: PercentileData = {
  "400": 0,
  "410": 0,
  "420": 0,
  "430": 0,
  "440": 0,
  "450": 0,
  "460": 0,
  "470": 0,
  "480": 0,
  "490": 0,
  "500": 0,
  "510": 0,
  "520": 0,
  "530": 0,
  "540": 0,
  "550": 0,
  "560": 0,
  "570": 0,
  "580": 0,
  "590": 0,
  "600": 0,
  "610": 0,
  "620": 0,
  "630": 1,
  "640": 1,
  "650": 1,
  "660": 1,
  "670": 1,
  "680": 2,
  "690": 2,
  "700": 3,
  "710": 3,
  "720": 4,
  "730": 5,
  "740": 6,
  "750": 7,
  "760": 8,
  "770": 9,
  "780": 10,
  "790": 11,
  "800": 12,
  "810": 13,
  "820": 15,
  "830": 16,
  "840": 17,
  "850": 19,
  "860": 20,
  "870": 21,
  "880": 23,
  "890": 24,
  "900": 26,
  "910": 27,
  "920": 29,
  "930": 30,
  "940": 32,
  "950": 34,
  "960": 35,
  "970": 37,
  "980": 39,
  "990": 40,
  "1000": 42,
  "1010": 44,
  "1020": 45,
  "1030": 47,
  "1040": 49,
  "1050": 51,
  "1060": 52,
  "1070": 54,
  "1080": 56,
  "1090": 58,
  "1100": 59,
  "1110": 61,
  "1120": 63,
  "1130": 64,
  "1140": 66,
  "1150": 67,
  "1160": 69,
  "1170": 70,
  "1180": 72,
  "1190": 73,
  "1200": 74,
  "1210": 76,
  "1220": 77,
  "1230": 78,
  "1240": 79,
  "1250": 81,
  "1260": 82,
  "1270": 83,
  "1280": 84,
  "1290": 85,
  "1300": 86,
  "1310": 87,
  "1320": 87,
  "1330": 88,
  "1340": 89,
  "1350": 90,
  "1360": 91,
  "1370": 91,
  "1380": 92,
  "1390": 93,
  "1400": 93,
  "1410": 94,
  "1420": 94,
  "1430": 95,
  "1440": 95,
  "1450": 96,
  "1460": 96,
  "1470": 97,
  "1480": 97,
  "1490": 98,
  "1500": 98,
  "1510": 98,
  "1520": 99,
  "1530": 99,
  "1540": 99,
  "1550": 99,
  "1560": 100,
  "1570": 100,
  "1580": 100,
  "1590": 100,
  "1600": 100,
};

type LabeledPoint = { x: number; y: number; extraText?: string };

// number | -1 type to emphasize that it can either be a percentile or -1 (meaning not found)
export function getPercentileFromData(
  data: PercentileData,
  score: number
): number | -1 {
  // -1 means that the percentile was not found
  return data[score] || -1;
}

export function convertParsedDataForGraphing({
  accepted,
  denied,
  unknown,
}: {
  accepted: ParsedTestData[];
  denied: ParsedTestData[];
  unknown: ParsedTestData[];
}): Partial<ScatterData>[] {
  // ACCEPTED
  let acceptedSAT = createPlotlyScatterData(
    "SAT - Accepted",
    "rgba(0,200,0,0.7)",
    "square",
    convertParsedDataToPoints(accepted.filter(({ test }) => test === "sat"))
  );
  let acceptedACT = createPlotlyScatterData(
    "ACT - Accepted",
    "rgba(0,200,0,0.7)",
    "star",
    convertParsedDataToPoints(accepted.filter(({ test }) => test === "act"))
  );

  // DENIED
  let deniedSAT = createPlotlyScatterData(
    "SAT - Denied",
    "rgba(255,0,0,0.7)",
    "square",
    convertParsedDataToPoints(denied.filter(({ test }) => test === "sat"))
  );
  let deniedACT = createPlotlyScatterData(
    "ACT - Denied",
    "rgba(255,0,0,0.7)",
    "star",
    convertParsedDataToPoints(denied.filter(({ test }) => test === "act"))
  );

  // UNKNOWN (we don't know what the status code meant)
  let unknownSAT = createPlotlyScatterData(
    "SAT - Unknown",
    "rgba(170,170,170,0.7)",
    "square",
    convertParsedDataToPoints(unknown.filter(({ test }) => test === "sat"))
  );
  let unknownACT = createPlotlyScatterData(
    "ACT - Unknown",
    "rgba(170,170,170,0.7)",
    "star",
    convertParsedDataToPoints(unknown.filter(({ test }) => test === "act"))
  );

  return [
    acceptedSAT,
    acceptedACT,
    deniedSAT,
    deniedACT,
    unknownSAT,
    unknownACT,
  ];
}

function convertParsedDataToPoints(data: ParsedTestData[]): LabeledPoint[] {
  return data.map((datum) => ({
    x: datum.percentile,
    y: datum.gpa,
    extraText: `${
      // raw score (SAT or ACT)
      datum.rawScore
    } ${
      // test type (SAT or ACT)
      datum.test.toUpperCase()
    }<br>${
      // application status converted to readable text
      convertApplicationStatusToText(datum.status)
    }`,
  }));
}

function createPlotlyScatterData(
  name: string,
  color?: string,
  symbol?: string,
  data?: LabeledPoint[]
): Partial<ScatterData> {
  // separate x and y values
  const x = data ? data.map((datum) => datum.x) : [];
  const y = data ? data.map((datum) => datum.y) : [];

  // get label texts
  const text = data ? data.map((datum) => datum.extraText || "") : [];

  return {
    x,
    y,
    text,
    name,
    hoverinfo: "x+y+text",
    mode: "markers",
    type: "scatter",
    marker: {
      color: color || "rgb(0, 0, 0)",
      size: 12,
      symbol: symbol,
    },
  };
}

export function mergeCollegeData(
  dataArr: CollegeData[],
  newName: string,
  newUuid: string = "00000000-0000-0000-0000-000000000000"
): CollegeData {
  let accepted: ParsedTestData[] = [];
  let denied: ParsedTestData[] = [];
  let unknown: ParsedTestData[] = [];

  dataArr.forEach(({ data }) => {
    // data cannot be null
    if (data) {
      // add data to the new arrays
      accepted.push(...data.accepted);
      denied.push(...data.denied);
      unknown.push(...data.unknown);
    }
  });

  // return merged college data
  return {
    name: newName,
    uuid: newUuid,
    data: { accepted, denied, unknown },
  };
}

export function mergeCollegeResults(results: CollegeResults[]): CollegeResults {
  let accepted: ParsedTestData[] = [];
  let denied: ParsedTestData[] = [];
  let unknown: ParsedTestData[] = [];

  results.forEach((result) => {
    // result must be defined
    if (result) {
      accepted.push(...result.accepted);
      denied.push(...result.denied);
      unknown.push(...result.unknown);
    }
  });

  return { accepted, denied, unknown };
}

function convertApplicationStatusToText(status: string) {
  // split status by uppercase letters, keeping
  // the split letters (keep delimiter thanks to:
  // https://stackoverflow.com/a/25221523)
  const statusArr = status.split(/(?=[A-Z]+)/g);

  // get second, then first, letter of the
  // decision status
  const decisionTypeSecondLetter = statusArr.pop();
  const decisionTypeFirstLetter = statusArr.pop();

  // concatenate the decision type letters
  const decisionType = decisionTypeFirstLetter! + decisionTypeSecondLetter!;

  // capitalize words and tack on decision type
  // at the end
  return (
    statusArr
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ") +
    " " +
    decisionType
  );
}
