import { useParams } from "react-router-dom";

import CollegeGroupComponent from "../components/CollegeGroupComponent";

import { groups } from "../config";

export default function GroupView() {
  const { id } = useParams();

  return id ? (
    <CollegeGroupComponent group={groups[parseInt(id)]} />
  ) : (
    <div>Data not found for UUID {id}</div>
  );
}
