import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// data
import { convertScrapedDataToCollegeDataFormat } from "../../data";

// types
import type { CollegeData, CollegeGroup } from "../../types/college";
import type { Matrix } from "../../utils/matrix";
import type { IPValue } from "../../utils/chi-square";

// utils
import { fetchCollegeData } from "../../utils/api";
import { independenceTest } from "../../utils/chi-square";
import { mergeCollegeData } from "../../utils/naviance";
import { createObservedAndExpectedMatrices } from "../../utils/group-data";

// components
import CollegeScatterPlot from "../CollegeScatterPlot";
import ChiSquareIndependenceTest from "./ChiSquareIndependenceTest";
import StandardizedTestRangeCounts from "./StandardizedTestRangeCounts";

// console.log(
//   independenceTest([
//     [560, 295],
//     [163, 72],
//     [37, 73],
//   ])
// );

(window as any).independenceTest = independenceTest;

interface GroupContextData {
  // merged data, as a CollegeData object
  groupData: CollegeData;
  // observed & expected matrices
  countMatrices: {
    observed: Matrix;
    expected: Matrix;
  };
  // chi square test results
  chiSquareTestResult: IPValue | null;
}
export const GroupContext = createContext<GroupContextData>(
  {} as GroupContextData
);

export default function CollegeGroupComponent({
  group: { name, colleges },
}: {
  group: CollegeGroup;
}) {
  const [allData, setAllData] = useState<CollegeData[]>([]);

  const groupMergedCollegeData = useMemo(
    () => mergeCollegeData(allData, name),
    [allData, name]
  );

  const countMatrices: { observed: Matrix; expected: Matrix } = useMemo(
    () =>
      allData.length > 0
        ? createObservedAndExpectedMatrices(groupMergedCollegeData.data!)
        : { observed: [], expected: [] },
    [allData.length, groupMergedCollegeData.data]
  );

  const chiSquareTestResult = useMemo(
    () =>
      countMatrices.observed.length > 0
        ? independenceTest(countMatrices.observed, countMatrices.expected)
        : null,
    [countMatrices.observed, countMatrices.expected]
  );

  useEffect(() => {
    async function getColleges() {
      // fetch data for all colleges
      setAllData(
        convertScrapedDataToCollegeDataFormat(await fetchCollegeData(colleges))
      );
    }

    // run code to fetch data
    getColleges();
  }, [colleges, name]);

  return allData.length > 0 ? (
    <GroupContext.Provider
      value={{
        countMatrices,
        chiSquareTestResult,
        groupData: groupMergedCollegeData,
      }}
    >
      <h1>{name}</h1>
      <section>
        <h2>Colleges</h2>
        <ul>
          {/* college names */}
          {colleges.map((uuid) => (
            <li key={uuid}>
              <Link to={"/college/" + uuid}>
                {allData.find((datum) => datum.uuid === uuid)?.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <ScatterPlot />
      <StandardizedTestRangeCounts />
      <ChiSquareIndependenceTest />
    </GroupContext.Provider>
  ) : (
    <>Loading...</>
  );
}

function ScatterPlot() {
  const { groupData } = useContext(GroupContext);

  return (
    <section>
      <h2>Merged Scatterplot</h2>
      <CollegeScatterPlot college={groupData} />
    </section>
  );
}
