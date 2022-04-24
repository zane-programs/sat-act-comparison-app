export type Matrix = number[][];

export function createMatrix(rows: number, columns: number): Matrix {
  return [...Array<number>(rows)].map((_) => Array<number>(columns));
}
