// scraped using capstone-sat-act-comparison (my other program)
export interface ScrapedNavianceDatum {
  name: string;
  uuid: string;
  data: {
    scattergrams: Scattergrams | null;
    applicationStatistics: any | null; // TODO: type this!
  };
}

export interface NavianceApplicationStatistics {
  scattergrams: Scattergrams | null;
  // TODO: Come back and create types for these
  applicationStatistics: any;
  applicationsByYear: any;
  userInfo: any;
  peerGpaMap: any;
}

export interface Scattergrams {
  gpa: GPAData;
  weightedGpa: GPAData;
}

export interface GPAData {
  gpaCount: number;
  gpaSum: number;
  gpaAvg: number;
  gpaConvSum: number;
  gpaConvAvg: number;
  // (both tests have the same data format)
  act: StandardizedTestData | null;
  sat: StandardizedTestData | null;
}

export interface StandardizedTestData {
  count: number;
  sum: number;
  avg: number;
  gpaCount: number;
  gpaSum: number;
  gpaAvg: number;
  gpaConvSum: number;
  gpaConvAvg: number;
  apps: StudentApplications;
}

// TODO: find all of these types
export interface StudentApplications {
  [key: string]: StudentScore[] | undefined;
  acceptedEA?: StudentScore[];
  acceptedRD?: StudentScore[];
  deniedEA?: StudentScore[];
  deniedRD?: StudentScore[];
  waitlistedAcceptedRD?: StudentScore[];
  waitlistedDeniedRD?: StudentScore[];
  waitlistedUnknownEA?: StudentScore[];
  waitlistedUnknownRD?: StudentScore[];
}

export interface StudentScore {
  currentStudent: boolean;
  typeName: "REA" | "RD" | "ED" | "EA"; // TODO: Verify these
  actComposite: number;
  actCompositeStudent: number;
  highestComboSat: number;
  studentSAT1600Composite: number;
  gpa: number;
}
