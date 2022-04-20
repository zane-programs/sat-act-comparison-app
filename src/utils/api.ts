import type { ScrapedNavianceDatum } from "../types/naviance";

const API_URL = "https://sat-act-api.vercel.app/api";

export async function fetchCollegeList(): Promise<{ [uuid: string]: string }> {
  // key: uuid
  // value: name
  return await _fetchEndpoint("/colleges");
}

export async function fetchCollegeData(
  uuid: string | string[]
): Promise<ScrapedNavianceDatum[]> {
  // fetch data for one or more colleges
  return await _fetchEndpoint(
    "/college/" + (typeof uuid === "string" ? uuid : uuid.join(","))
  );
}

async function _fetchEndpoint(endpoint: string) {
  const req = await fetch(API_URL + endpoint);
  return await req.json();
}
