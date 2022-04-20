import { createContext, useContext } from "react";

import TeX from "@matejmazur/react-katex";

import type { CollegeData } from "../../types/college";

const ChiSquareContext = createContext<{ collegeData?: CollegeData }>({});

export default function ChiSquareIndependenceTest({
  collegeData,
}: {
  collegeData: CollegeData;
}) {
  return (
    <ChiSquareContext.Provider value={{ collegeData }}>
      <h2>
        <TeX math="\boldsymbol{\chi^2}" /> Test
      </h2>
      <AssumptionsAndConditions />
      <CalculationsComponent />
    </ChiSquareContext.Provider>
  );
}

function AssumptionsAndConditions() {
  const { collegeData } = useContext(ChiSquareContext);

  return (
    <>
      <h3>Assumptions and Conditions</h3>
      <ul>
        <AssumptionsAndConditionsLine
          name="Counts"
          value="Given (see table above)"
        />
        <AssumptionsAndConditionsLine
          name="Random"
          value="Not applicable, as we have data for the entire population (from the past six years)"
        />
        <AssumptionsAndConditionsLine
          name="10%"
          value="N/A, since we’re not looking to generalize to a larger population than our sample/see above?"
        />
        <AssumptionsAndConditionsLine name="Exp. cell counts ≥ 5" value="??" />
      </ul>
      <p>
        OK to run a <TeX>\chi^2</TeX> test for independence.
      </p>
    </>
  );
}

function CalculationsComponent() {
  return (
    <>
      <h3>Calculations</h3>
      <p>
        <strong>Chi Square Formula:</strong>{" "}
        <TeX math="\chi^2 = \sum \frac{\left(O_i - E_i\right)^2}{E_i}" />
      </p>
    </>
  );
}

function AssumptionsAndConditionsLine({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  return (
    <li>
      <strong>{name}?</strong> {value}
    </li>
  );
}
