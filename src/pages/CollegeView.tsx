import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// components
import BackLinkButton from "../components/BackLinkButton";
import CollegeScatterPlot from "../components/CollegeScatterPlot";

// data
import { convertScrapedDataToCollegeDataFormat } from "../data";
import { CollegeData } from "../types/college";
import { fetchCollegeData } from "../utils/api";

export default function CollegeView() {
  const { uuid } = useParams();

  // // find college
  // const college = useMemo(
  //   () => collegeData.find((college) => college.uuid === uuid),
  //   [uuid]
  // );

  const [college, setCollege] = useState<CollegeData>();

  useEffect(() => {
    async function getCollege() {
      if (uuid) {
        // fetch college data, convert, and get first element
        setCollege(
          convertScrapedDataToCollegeDataFormat(await fetchCollegeData(uuid))[0]
        );
      }
    }

    getCollege();
  }, [uuid]);

  return (
    <>
      <BackLinkButton />
      {college ? (
        <CollegeScatterPlot college={college} />
      ) : (
        <div style={{ marginTop: "20px" }}>Loading...</div>
      )}
    </>
  );
}
