import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCollegeList } from "../utils/api";

export default function Home() {
  const [collegeList, setCollegeList] = useState<{ [uuid: string]: string }>(
    {}
  );

  useEffect(() => {
    async function getList() {
      setCollegeList(await fetchCollegeList());
    }
    getList();
  }, [setCollegeList]);

  return (
    <>
      <h1>College Scatterplots</h1>
      {Object.keys(collegeList).length === 0 ? (
        "Loading..."
      ) : (
        <ul>
          {Object.keys(collegeList).map((uuid) => (
            <li key={uuid}>
              <Link to={"/college/" + uuid}>{collegeList[uuid]}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
