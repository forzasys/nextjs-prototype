import { EventQueryType, Tag } from "../types/dataTypes";

export function generateEventQueryFromParams(searchParams: URLSearchParams): EventQueryType {
  
  const params = searchParams

  const season = params.get("season") || "2025";
  const seasonInt = parseInt(season)
  const tagParam = params.get("tag") || undefined;
  const pageParam = params.get("page");
  const page = Number(pageParam) || 1;
  const from = Math.min((page - 1) * 10);

  const query: EventQueryType = {
    from_date: `${seasonInt}-01-01T00:00:00.000Z`,
    to_date: `${seasonInt + 1}-01-01T00:00:00.000Z`,
    count: 10,
  };

  if (tagParam) query.tags = { action: tagParam as Tag };

  if (page) query.from = from;

  return query;
}

export type SearchParamsType = Record<string, string | string[] | undefined>;

export function normalizeSearchParams(rawParams: SearchParamsType): URLSearchParams {
  const cleaned: Record<string, string> = {};

  for (const [key, value] of Object.entries(rawParams)) {
    if (typeof value === 'string') {
      cleaned[key] = value;
    } else if (Array.isArray(value)) {
      cleaned[key] = value[0]; // or join with comma if multiple allowed
    }
    // skip undefined and any unexpected types
  }

  return new URLSearchParams(cleaned);
}