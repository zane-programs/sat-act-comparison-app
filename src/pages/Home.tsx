import { Link } from "react-router-dom";
import { collegeData } from "../data";

export default function Home() {
  return (
    <ul>
      {collegeData.map(({ name, uuid }) => (
        <li>
          <Link to={"/college/" + uuid}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
