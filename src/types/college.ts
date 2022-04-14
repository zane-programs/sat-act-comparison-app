export interface ParsedTestData {
  test: "sat" | "act";
  status: string;
  gpa: number;
  rawScore: number;
  percentile: number;
}

export interface CollegeData {
  name: string;
  uuid: string;
  data: {
    accepted: ParsedTestData[];
    denied: ParsedTestData[];
    unknown: ParsedTestData[];
  } | null;
}
