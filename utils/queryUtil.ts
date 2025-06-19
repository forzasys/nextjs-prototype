import { PlaylistQueryType, GamesQueryType } from "../types/dataTypes";
import { availableSeasons } from "@/lib/config";

function generateTags(tagParam?: string | null, teamParam?: string | null) {
  
  if (!tagParam) return null
  
  let tags
  if (tagParam) tags = [{action: tagParam}];

  if (teamParam && tags) {
    const updatedTags = tags.map(tag => ({
      ...tag,
      team: { id: Number(teamParam) },
    }));
    tags = updatedTags
  }
  return tags
}

export const initialPlaylistsQuery = {
  from_date: `${availableSeasons[0]}-01-01`,
  to_date: `${availableSeasons[0]}-12-31`,
  count: 10,
  from: 0,
}

const today = new Date();
const formattedToday = today.toISOString().split('T')[0];

export const initialGamesQuery: GamesQueryType = {
  season: availableSeasons[0],
  from_date: formattedToday,
  asc: true,
}

export function generatePlaylistQueryFromParams(searchParams: URLSearchParams): PlaylistQueryType {
  
  const params = searchParams

  const currentSeason = availableSeasons[0]

  const seasonParam = params.get("season");
  const tagParam = params.get("tag")
  const teamParam = params.get("team")
  const pageParam = params.get("page");

  const page = Number(pageParam) || 1;
  const from = Math.min((page - 1) * 10);

  const query: PlaylistQueryType = structuredClone(initialPlaylistsQuery)

  const tags = generateTags(tagParam, teamParam)

  if (seasonParam) {
    const seasonInt = parseInt(seasonParam)
    query.from_date = `${seasonInt-1}-01-01`
    query.to_date = `${seasonInt-1}-12-31`
  }

  if (!seasonParam) {
    query.from_date = `${currentSeason}-01-01`
    query.to_date = `${currentSeason}-12-31`
  }

  if (tags) query.tags = tags

  if (page) query.from = from;
  
  return query;
}

export function generateGamesQueryFromParams (searchParams: URLSearchParams) {
  const params = searchParams

  const currentSeason = availableSeasons[0]

  const seasonParam = params.get("season");
  const teamParam = params.get("team");
  const typeParam = params.get("game_type");

  const query: GamesQueryType = structuredClone(initialGamesQuery)

  if (typeParam === "results") {
    delete query.from_date;
    query.asc = false;
    if (seasonParam) {
      query.season = seasonParam
    } else {
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];
      query.season = currentSeason
      query.to_date = formattedToday
    }
  }

  if (!typeParam || typeParam === "fixtures") {
    delete query.to_date;
  }

  if (teamParam) query.team_id = parseInt(teamParam)

  return query
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
  }

  return new URLSearchParams(cleaned);
}