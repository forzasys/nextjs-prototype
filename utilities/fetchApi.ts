import config from '@/config';
import { QueryType } from "@/types/dataTypes";
import stringify from "fast-json-stable-stringify";

export function getApiPath (
  path: string, 
  query?: QueryType,
) {
  
  query = query || {}
  // if (league === undefined) query = {all_leagues: true, ...query}
  if (!path.startsWith("/")) path = "/" + path

  const apiServerUrl = config.apiUrl
  // TODO make the league stricter
  let league = query.league || config.league
  if (Array.isArray(league)) league = league[0]
  const url = new URL(apiServerUrl + league + path)

  // It's important to add query parameters in sorted order to get an identical cache key
  const queryKeys = Object.keys(query).filter(key => query[key] !== undefined && query[key] !== null)
  queryKeys.sort()
  queryKeys.forEach(key => {
    const value = query![key]
    if (typeof value === 'object' && value !== null) {
      url.searchParams.set(key, stringify(value));
    } else {
      url.searchParams.set(key, String(value));
    }
  })

  const leagueUrlOverride = config.leagueUrlOverride
  if (leagueUrlOverride) leagueUrlOverride(url)

  return url.toString()
}

export async function onFetch(path: string, query?: QueryType) {
  const apiPath = getApiPath(path, query)
  
  if (typeof window === 'undefined') {
    console.log("🟠 SSR fetching:", apiPath);
  } else {
    console.log("🔵 Client fetching:", apiPath);
  }

  const res = await fetch(apiPath, {mode: "cors", credentials: "include"})

  if (res.ok) return await res.json()

  const error = new Error() as Error & { status?: number; message?: string };
  error.status = res.status;
  const {message} = await res.json().catch(() => ({message: ""}))
  error.message = message
  console.error("Failed request:", apiPath, error.status, error.message)
  // throw error
}