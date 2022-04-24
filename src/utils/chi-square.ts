// @ts-ignore
import { cdf } from "chi-squared";

// types
import type { Matrix } from "./matrix";

// utils
import { createMatrix } from "./matrix";

// The following code was adapted (and extended)
// from https://github.com/neeraj3029/chi-sq-test
// Thank you, Neeraj Rajpurohit!!!

export interface IPValue {
  value: number;
  pValue: number;
  expMatrix: Matrix;
  compMatrix: Matrix;
}

export function independenceTest(
  observed: Matrix, // Matrix of observed values
  expected?: Matrix, // Matrix of expected values
  ddof?: number // delta degrees of freedom
): IPValue {
  if (!Array.isArray(observed) || observed.length === 0) {
    throw new TypeError("expected frequency must be an array of size > 0");
  }

  const K = observed?.length;
  const M = observed[0]?.length;
  const rowSums = Array.apply(null, Array(K)).map(Number.prototype.valueOf, 0);
  const colSums = Array.apply(null, Array(M)).map(Number.prototype.valueOf, 0);
  let n = 0;

  rowSums.forEach((_, i) => {
    colSums.forEach((_, j) => {
      rowSums[i] += observed[i][j];
      colSums[j] += observed[i][j];
      n += observed[i][j];
    });
  });

  // expected and component matrices
  // (use given matrix for expMatrix
  // if provided; otherwise create one)
  let expMatrix = expected || createMatrix(K, M);
  let compMatrix = createMatrix(K, M);

  let chiSq = 0;
  rowSums.forEach((rowEle, i) => {
    colSums.forEach((colEle, j) => {
      // either use given expected matrix or calculate it manually
      const exp = expected ? expected[i][j] : (rowEle * colEle) / n;
      // calculate component using chi square formula
      const component = (observed[i][j] - exp) ** 2 / exp;

      // add component to chi square value
      chiSq += component;

      // set component in matrix
      compMatrix[i][j] = component;

      // if expected matrix not provided,
      // set calculated expected value in
      // expMatrix
      if (!expected) {
        expMatrix[i][j] = exp;
      }
    });
  });

  return {
    value: chiSq,
    pValue: 1 - cdf(chiSq, (K - 1) * (M - 1) - (ddof || 0)),
    expMatrix,
    compMatrix,
  };
}
