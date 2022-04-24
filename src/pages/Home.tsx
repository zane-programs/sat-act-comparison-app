import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// utils
import { fetchCollegeList } from "../utils/api";

export default function Home() {
  const [collegeList, setCollegeList] = useState<{ [uuid: string]: string }>(
    {}
  );

  const [searchQuery, setSearchQuery] = useState<string>("");

  const collegeKeys = useMemo(() => {
    const keys = Object.keys(collegeList).sort((a, b) =>
      collegeList[a].localeCompare(collegeList[b])
    );

    return searchQuery
      ? keys.filter(
          (key) =>
            collegeList[key]
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) !== -1
        )
      : keys;
  }, [collegeList, searchQuery]);

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
        <p>Loading...</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {
            // button to clear search query
            searchQuery ? (
              <ClearSearchButton
                onClick={() => setSearchQuery("")}
                aria-label="Clear Search"
                title="Clear Search"
              >
                &#x2715;
              </ClearSearchButton>
            ) : null
          }
          <ul>
            {collegeKeys.map((uuid) => (
              <li key={uuid}>
                <Link to={"/college/" + uuid}>{collegeList[uuid]}</Link>
              </li>
            ))}
          </ul>
          {searchQuery && collegeKeys.length === 0 ? <p>No Results</p> : null}
        </>
      )}
    </>
  );
}

const ClearSearchButton = styled.button`
  margin-left: 5px;
`;
