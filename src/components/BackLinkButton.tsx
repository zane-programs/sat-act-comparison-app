import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function BackLinkButton() {
  const navigate = useNavigate();

  return (
    <DummyLinkButton onClick={() => navigate(-1)}>&lt; back</DummyLinkButton>
  );
}

const DummyLinkButton = styled.button`
  display: block;

  background: transparent;
  border: none;

  font-family: serif;
  font-size: 1em;

  padding: 0;
  margin: 0;

  color: #00f;
  text-decoration: underline;

  cursor: pointer;

  &:active {
    color: #f00;
  }
`;
