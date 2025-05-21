import { EventQueryType, Tag } from "../types/dataTypes";

export function generateEventQueryFromParams(searchParams: URLSearchParams): EventQueryType {
  
  const tag = searchParams.get("tag") || undefined;
  const pageParam = searchParams.get("page");
  const page = Number(pageParam) || 1;
  const from = Math.min((page - 1) * 10);

  const query: EventQueryType = {
    from_date: "2024-01-01T00:00:00.000Z",
    to_date: "2025-01-01T00:00:00.000Z",
    min_rating: 3,
    count: 10,
  };

  if (tag) query.tags = { action: tag as Tag };
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