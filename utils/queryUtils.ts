import { PlaylistQueryType, GamesQueryType, TopScorerQueryType, TagsType } from "../types/dataTypes";
import Config from "@/lib/config";

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
  from_date: `${Config.availableSeasons[0]}-01-01`,
  to_date: `${Config.availableSeasons[0]}-12-31`,
  count: 10,
  from: 0,
}

const today = new Date();
const formattedToday = today.toISOString().split('T')[0];

export const initialGamesQuery: GamesQueryType = {
  season: Config.availableSeasons[0],
  from_date: formattedToday,
  asc: true,
}

export function generatePlaylistQueryFromParams(searchParams: URLSearchParams): PlaylistQueryType {
  
  const params = searchParams

  const currentSeason = Config.availableSeasons[0]

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

  const currentSeason = Config.availableSeasons[0]

  const seasonParam = params.get("season");
  const teamParam = params.get("team");
  const typeParam = params.get("match_type");

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

export function generateVideosCollectionQuery (videosCollectionQuery: PlaylistQueryType) {
  
  let query = structuredClone(videosCollectionQuery)

  // Team platform
  const teamPlatformId = Config.team

  if (teamPlatformId) {
    query.team_id = teamPlatformId
    const channelId = Config.channel
    const queryTags = query?.tags
    if (queryTags) {
      const updatedTags = queryTags.map((tag: TagsType) => ({
          ...tag,
          team: { id: Number(teamPlatformId) },
      }));
      query = {
          ...query,
          tags: updatedTags
      };
    } else {
        query = {
            ...query,
            channels: channelId
        };
    }
  }

  // VIF
  if (teamPlatformId === 1) {
    const fromDate = query.from_date
    const toDate = query.to_date
    const teamInOtherLeague = fromDate === "2024-01-01" && toDate === "2024-12-31"
    if (teamInOtherLeague) query.league = "obosligaen"
  }

  return query
}

export function generateTopScorerQuery (topScorerQuery: TopScorerQueryType) {
  
  const query = structuredClone(topScorerQuery)
  
  // Team platform
  const teamPlatformId = Config.team

  if (teamPlatformId) {
      query.team_id = teamPlatformId
  }

  // VIF
  if (teamPlatformId === 1) {
    const fromDate = query.from_date
    const toDate = query.to_date
    const teamInOtherLeague = fromDate === "2024-01-01" && toDate === "2024-12-31"
    if (teamInOtherLeague) query.league = "obosligaen"
  }

  return query
}