import { useContext, useMemo } from "react";
import styled from "styled-components";
import TeX from "@matejmazur/react-katex";

// context
import { GroupContext } from ".";

// config
import { CHI_SQUARE_ALPHA_VALUE } from "../../config";

export default function ChiSquareIndependenceTest() {
  const { chiSquareTestResult } = useContext(GroupContext);

  return (
    <>
      <h2>
        <TeX math="\boldsymbol{\chi^2}" /> Test
      </h2>
      {chiSquareTestResult ? (
        <section>
          <Hypotheses />
          <AssumptionsAndConditions />
          <CalculationsComponent />
          <Conclusion />
        </section>
      ) : (
        <p>
          <strong>
            ERROR: Insufficient data for chi square test (must have at least two
            rows of data)
          </strong>
        </p>
      )}
    </>
  );
}

function Hypotheses() {
  const {
    groupData: { name: groupName },
  } = useContext(GroupContext);

  const groupNameStr = useMemo(
    () => (groupName ? " for " + groupName : ""),
    [groupName]
  );

  return (
    <>
      <h3>1. Hypotheses</h3>
      <p>
        <span>
          <TeX>H_0</TeX>: There is no association between standardized test type
          (SAT or ACT) and university acceptance{groupNameStr}.
        </span>
        <br />
        <span>
          <TeX>H_A</TeX>: There <em>is</em> an association between standardized
          test type (SAT or ACT) and university acceptance{groupNameStr}.
        </span>
      </p>
    </>
  );
}

function AssumptionsAndConditions() {
  return (
    <>
      <h3>2. Assumptions and Conditions</h3>
      <ol>
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
        <AssumptionsAndConditionsLine name="Exp. cell counts ≥ 5" value="Yes (see table above)" />
      </ol>
      <p>
        OK to run a <TeX>\chi^2</TeX> test for independence.
      </p>
    </>
  );
}

function CalculationsComponent() {
  const { countMatrices, chiSquareTestResult } = useContext(GroupContext);

  const firstObserved = useMemo(
    () => countMatrices.observed[0][0].toFixed(3),
    [countMatrices.observed]
  );
  const firstExpected = useMemo(
    () => countMatrices.expected[0][0].toFixed(3),
    [countMatrices.expected]
  );
  const lastObserved = useMemo(
    () => countMatrices.observed.slice(-1)[0].slice(-1)[0].toFixed(3),
    [countMatrices.observed]
  );
  const lastExpected = useMemo(
    () => countMatrices.expected.slice(-1)[0].slice(-1)[0].toFixed(3),
    [countMatrices.expected]
  );

  return chiSquareTestResult ? (
    <>
      <h3>3. Calculations</h3>
      <p>
        For these calculations, we will use{" "}
        <TeX math={"\\alpha = " + CHI_SQUARE_ALPHA_VALUE} />.
      </p>
      <ChiSquareResultHeading>Chi Square Formula:</ChiSquareResultHeading>
      <p>
        <TeX math="\chi^2 = \sum \frac{\left(O_i - E_i\right)^2}{E_i}" />
      </p>
      <p>
        <TeX
          math={`\\chi^2 = \\frac{\\left(${firstObserved} - ${firstExpected}\\right)^2}{${firstExpected}} + \\ldots + \\frac{\\left(${lastObserved} - ${lastExpected}\\right)^2}{${lastExpected}}`}
        />
      </p>
      <ChiSquareResultHeading>Calculator Output:</ChiSquareResultHeading>
      <p>
        <TeX
          math={`\\boldsymbol{\\chi^2 = ${chiSquareTestResult.value.toFixed(
            3
          )}}\\newline \\boldsymbol{p = ${chiSquareTestResult.pValue.toFixed(
            3
          )}}`}
        />
      </p>
    </>
  ) : (
    <p>Loading...</p>
  );
}

function Conclusion() {
  const {
    chiSquareTestResult,
    groupData: { name: groupName },
  } = useContext(GroupContext);
  return (
    <>
      <h3>4. Conclusion</h3>
      {chiSquareTestResult ? (
        <>
          <p>
            Because{" "}
            <TeX
              math={`p = ${chiSquareTestResult.pValue.toFixed(3)} ${
                // greater than sign or less than or equal to sign
                chiSquareTestResult.pValue > CHI_SQUARE_ALPHA_VALUE
                  ? ">"
                  : "\\leq"
              } \\alpha = ${CHI_SQUARE_ALPHA_VALUE}`}
            />
            , we{" "}
            {chiSquareTestResult.pValue > CHI_SQUARE_ALPHA_VALUE
              ? "fail to reject"
              : "reject"}{" "}
            <TeX>H_0</TeX>.
          </p>
          <p>
            <strong>
              Therefore, we{" "}
              <u>
                {chiSquareTestResult.pValue > CHI_SQUARE_ALPHA_VALUE ? (
                  <>
                    do <em>not</em>
                  </>
                ) : (
                  <em>do</em>
                )}
              </u>{" "}
              have convincing evidence of an association between standardized
              test type (SAT or ACT) and university acceptance
              {groupName ? " for " + groupName : ""}.
            </strong>
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
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

const ChiSquareResultHeading = styled.h4`
  margin-top: 20px;
  margin-bottom: 0px;
`;
