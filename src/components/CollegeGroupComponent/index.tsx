import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// data
import { convertScrapedDataToCollegeDataFormat } from "../../data";

// types
import type { CollegeData, CollegeGroup } from "../../types/college";
import { fetchCollegeData } from "../../utils/api";

// utils
// import { independenceTest } from "../../utils/chi-square";
import { mergeCollegeData } from "../../utils/naviance";

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
    <>
      <h1>{name}</h1>
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
      <h2>Merged Scatterplot</h2>
      <CollegeScatterPlot college={groupMergedCollegeData} />
      <StandardizedTestRangeCounts
        data={groupMergedCollegeData}
        percentileInterval={10}
      />
      <ChiSquareIndependenceTest collegeData={groupMergedCollegeData} />
    </>
  ) : (
    <>Loading...</>
  );
}
