import { useMemo } from "react";

import { collegeData } from "../data";
import { CollegeData, ParsedTestData } from "../types/college";
import { CollegeGroup } from "../types/misc";
import { mergeCollegeData } from "../utils/naviance";
import CollegeScatterPlot from "./CollegeScatterPlot";

export default function CollegeGroupComponent({
  group: { name, colleges },
}: {
  group: CollegeGroup;
}) {
  const groupMergedCollegeData = useMemo(() => {
    const allData = colleges
      // filter out empty strings
      .filter((uuid) => uuid !== "")
      // get college info for uuid (and
      // assume it's defined)
      .map((uuid) => getCollegeDatum(uuid)!);

    return mergeCollegeData(allData, name);
  }, [colleges, name]);

  return (
    <div>
      <h1>{name}</h1>
      <h2>Colleges</h2>
      <ul>
        {/* college names */}
        {colleges.map((uuid) => (
          <li>
            {__NAVIANCE_DATA__.find((datum) => datum.uuid === uuid)?.name}
          </li>
        ))}
      </ul>
      <h2>Merged Scatterplot</h2>
      <CollegeScatterPlot college={groupMergedCollegeData} />
      <h2>Counts</h2>
      <StandardizedTestRangeCounts
        data={groupMergedCollegeData}
        percentileInterval={10}
      />
    </div>
  );
}

function StandardizedTestRangeCounts({
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
    <>
      {ranges.map((range) => (
        <PercentileRangeCount
          key={range[0] + ":" + range[1]}
          range={range}
          data={data}
        />
      ))}
    </>
  );
}

function PercentileRangeCount({
  range,
  data: { data },
}: {
  range: number[];
  data: CollegeData;
}) {
  const rangeData: CollegeData["data"] = useMemo(
    () => (data ? filterDataByRange(data, range) : null),
    []
  );

  return (
    <>
      <h3>{getPercentileRangeString(range)}</h3>
      {rangeData ? (
        <ul>
          <li>Accepted: {rangeData.accepted.length}</li>
          <li>Denied: {rangeData.denied.length}</li>
          <li>Unknown: {rangeData.unknown.length}</li>
        </ul>
      ) : (
        "No Data"
      )}
    </>
  );
}

function filterDataByRange(
  {
    accepted,
    denied,
    unknown,
  }: {
    accepted: ParsedTestData[];
    denied: ParsedTestData[];
    unknown: ParsedTestData[];
  },
  range: number[]
): {
  accepted: ParsedTestData[];
  denied: ParsedTestData[];
  unknown: ParsedTestData[];
} {
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

function getCollegeDatum(uuid: string): CollegeData | undefined {
  return collegeData.find((college) => uuid === college.uuid);
}

function generatePercentileRanges(interval: number): number[][] {
  let x = 100;
  let percentiles = [];

  while (x > 0) {
    percentiles.push([x === 100 ? x : x - 1, x - interval]);
    x -= interval;
  }

  return percentiles;
}

function getPercentileRangeString(range: number[]) {
  return `${range[0]}th - ${range[1]}th Percentiles`;
}
