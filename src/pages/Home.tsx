import { Link } from "react-router-dom";
import { collegeData } from "../data";

export default function Home() {
  return (
    <>
      <h1>College Scatterplots</h1>
      <ul>
        {collegeData.map(({ name, uuid }) => (
          <li key={uuid}>
            <Link to={"/college/" + uuid}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
