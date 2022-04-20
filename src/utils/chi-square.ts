// @ts-ignore
import { cdf } from "chi-squared";

// The following code was adapted from https://github.com/neeraj3029/chi-sq-test
// Thank you, Neeraj Rajpurohit!

const throwError = (msg: string) => {
  throw new TypeError(msg);
};

export interface IPValue {
  value: number;
  pValue: number;
}

export const independenceTest = (observed: number[][], ddof = 0): IPValue => {
  if (!Array.isArray(observed) || observed.length === 0) {
    throwError("expected frequency must be an array of size > 0");
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

  let chiSq = 0;
  rowSums.forEach((rowEle, i) => {
    colSums.forEach((colEle, j) => {
      const exp = (rowEle * colEle) / n;
      chiSq += (observed[i][j] - exp) ** 2 / exp;
    });
  });

  return {
    value: chiSq,
    pValue: 1 - cdf(chiSq, (K - 1) * (M - 1) - ddof),
  };
};
