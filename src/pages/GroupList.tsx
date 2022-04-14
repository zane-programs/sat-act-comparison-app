import { Link } from "react-router-dom";
import { groups } from "../config";

export default function GroupList() {
  return (
    <>
      <h1>Groups</h1>
      <p>
        <i>
          A handcrafted selection of colleges for use in chi-square
          (homogeneity?) tests
        </i>
      </p>
      <ul>
        {groups.map(({ name }, index) => (
          <li key={index + name}>
            <Link to={`/group/${index}/${slugify(name)}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

const slugify = (text: string) =>
  encodeURIComponent(text.toLowerCase().replace(/ /g, "-"));
