import type { ScrapedNavianceDatum } from "../types/naviance";

const API_URL = "https://sat-act-api.vercel.app/api";
// const API_URL = "http://localhost:3000/api";

export async function fetchCollegeList(): Promise<{ [uuid: string]: string }> {
  // key: uuid
  // value: name
  return await _fetchEndpoint("/colleges");
}

export async function fetchCollegeData(
  uuid: string | string[]
): Promise<ScrapedNavianceDatum[]> {
  const uuidsArray = typeof uuid === "string" ? [uuid] : uuid;

  // fetch data for one or more colleges
  return await _fetchEndpoint("/college", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uuid: uuidsArray }),
  });
}

async function _fetchEndpoint(endpoint: string, init?: RequestInit) {
  const req = await fetch(API_URL + endpoint, init);
  return await req.json();
}
