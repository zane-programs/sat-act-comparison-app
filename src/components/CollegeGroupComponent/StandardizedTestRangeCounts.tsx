import { createContext, useContext, useMemo } from "react";
import styled from "styled-components";
import TeX from "@matejmazur/react-katex";

// context
import { GroupContext } from ".";

// types
import type { CollegeData, CollegeResults } from "../../types/college";

// utils
import {
  calculateExpectedCount,
  getTestCount,
  groupDataByExpectedCount,
} from "../../utils/group-data";

const RangeDataContext = createContext<CollegeResults>({} as CollegeResults);

export default function StandardizedTestRangeCounts() {
  const { groupData: data } = useContext(GroupContext);

  const groupedData = useMemo(
    () => groupDataByExpectedCount(data.data!),
    [data.data]
  );

  return (
    <section>
      <h2>Counts</h2>
      <p>
        Expected counts, shown in parentheses in each cell, are calculated using
        this formula:
      </p>
      <p>
        <TeX math="E_i = \sum \left(\text{\# SATs or ACTs}\right) \cdot \frac{\sum \text{category}}{\sum \text{row}}" />
      </p>
      <p>
        where "category" represents the total data for either accepted or
        denied, depending on the column.
      </p>
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
          {groupedData.map((group) => (
            <GroupCountRow rangeData={group} key={JSON.stringify(group)} />
          ))}
          <TotalsRow data={data} />
        </tbody>
      </RangeCountsTable>
    </section>
  );
}

function GroupCountRow({ rangeData }: { rangeData: CollegeResults }) {
  // row total
  const rowTotal = useMemo(
    () => (rangeData ? rangeData.accepted.length + rangeData.denied.length : 0),
    [rangeData]
  );

  return (
    <tr>
      <td>
        {getPercentileRangeString(
          getPercentileRangeFromCollegeResults(rangeData)
        )}
      </td>
      {rangeData ? (
        <RangeDataContext.Provider value={rangeData}>
          {/* Accepted SAT */}
          <GroupCountRowCell category="accepted" testName="sat" />
          {/* Accepted ACT */}
          <GroupCountRowCell category="accepted" testName="act" />
          {/* Denied SAT */}
          <GroupCountRowCell category="denied" testName="sat" />
          {/* Denied ACT */}
          <GroupCountRowCell category="denied" testName="act" />
          {/* Row Total */}
          <CountCell>
            <strong>{rowTotal}</strong>
          </CountCell>
        </RangeDataContext.Provider>
      ) : (
        <td colSpan={5}>No data</td>
      )}
    </tr>
  );
}

function GroupCountRowCell({
  category,
  testName,
}: {
  category: "accepted" | "denied";
  testName: "sat" | "act";
}) {
  const rangeData = useContext(RangeDataContext);

  return (
    <CountCell>
      {/* test count (see getTestCount) */}
      {getTestCount(rangeData, category, testName)}{" "}
      {/* expected count: total SATs or ACTs multiplied by accept or deny rate for this category */}
      ({calculateExpectedCount(rangeData, category, testName).toFixed(3)})
    </CountCell>
  );
}

function TotalsRow({ data: { data } }: { data: CollegeData }) {
  return (
    <TotalsRowTr>
      <td>Total</td>
      {data ? (
        <>
          {/* Accepted SAT */}
          <CountCell>{getTestCount(data, "accepted", "sat")}</CountCell>
          {/* Accepted ACT */}
          <CountCell>{getTestCount(data, "accepted", "act")}</CountCell>
          {/* Denied SAT */}
          <CountCell>{getTestCount(data, "denied", "sat")}</CountCell>
          {/* Denied SAT */}
          <CountCell>{getTestCount(data, "denied", "act")}</CountCell>
          {/* Overall Total */}
          <CountCell>{data.accepted.length + data.denied.length}</CountCell>
        </>
      ) : (
        <td colSpan={5}>No data</td>
      )}
    </TotalsRowTr>
  );
}

function getPercentileRangeString(range: number[]) {
  return `${range[0]}th - ${range[1]}th Percentiles`;
}

function getPercentileRangeFromCollegeResults({
  accepted,
  denied,
}: CollegeResults): number[] {
  // get percentiles from accepted and denied data
  const acceptedAndDeniedPercentiles = [...accepted, ...denied].map(
    (datum) => datum.percentile
  );

  // return min and max of data
  return [
    Math.min(...acceptedAndDeniedPercentiles),
    Math.max(...acceptedAndDeniedPercentiles),
  ];
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

const CountCell = styled.td`
  font-family: monospace;
  font-size: 14px;
`;

const TotalsRowTr = styled.tr`
  font-weight: 700;
`;
