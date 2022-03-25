import { useMemo } from "react";
import { useParams } from "react-router-dom";
import CollegeScatterPlot from "../components/CollegeScatterPlot";

import { collegeData } from "../data";

export default function CollegeView() {
  const { uuid } = useParams();

  // find college
  const college = useMemo(
    () => collegeData.find((college) => college.uuid === uuid),
    [uuid]
  );

  return college ? (
    <CollegeScatterPlot college={college} />
  ) : (
    <div>Data not found for UUID {uuid}</div>
  );
}
