import { EventQueryType } from "@/types/dataTypes";
import stringify from "fast-json-stable-stringify";

export function getApiPath (
  path: string, 
  query?: EventQueryType,
  league?: string
) {
  query = query || {}
  if (league === undefined) query = {all_leagues: true, ...query}
  if (!path.startsWith("/")) path = "/" + path

  const apiServerUrl = "https://api.forzify.com/"
  const url = new URL(apiServerUrl + (league || "allsvenskan") + path)

  // It's important to add query parameters in sorted order to get an identical cache key
  const queryKeys = Object.keys(query).filter(key => query[key] !== undefined && query[key] !== null)
  queryKeys.sort()
  queryKeys.forEach(key => {
    const value = query[key]
    if (typeof value === 'object' && value !== null) {
      url.searchParams.set(key, stringify(value));
    } else {
      url.searchParams.set(key, String(value));
    }
  })

  return url.toString()
}

export async function fetcher(path: string, query: EventQueryType) {
  const apiPath = getApiPath(path, query)
  
  if (typeof window === 'undefined') {
    console.log("🟠 SSR fetching:", apiPath);
  } else {
    console.log("🔵 Client fetching:", apiPath);
  }

  const res = await fetch(apiPath, {
    next: { revalidate: 180 }, // 3 minutes
  });

  return res.json();
}