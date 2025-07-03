import { TagsType, QueryType } from "@/types/dataTypes";
import { SearchParamsType } from "@/types/dataTypes";
import config from '@/config';

export function addTeamToQuery(query: QueryType) {
  const teamPlatformId = config.team
  query.team_id = teamPlatformId
  return query
}

interface GenerateTagsParams {
  tag?: string | null;
  teamParam?: string | null;
  playerParam?: string | null;
}

function generateTags({tag, teamParam, playerParam}: GenerateTagsParams) {
  
  if (!tag) return null
  
  let tags = [{action: tag}]

  if (teamParam) {
    const updatedTags = tags.map(tag => ({
      ...tag,
      team: { id: Number(teamParam) },
    }));
    tags = updatedTags
  }

  if (playerParam) {

    let role = "player"
    if (tag === "goal") role = "scorer"
    if (tag === "assist") role = "assist by"
    if (tag === "penalty") role = "player awarded"
    
    const updatedTags = tags.map(tag => ({
      ...tag,
      [role]: { id: Number(playerParam) },
    }));
    tags = updatedTags
  }

  return tags
}

// TODO handle filters: ["event"]
export const initialPlaylistsQuery = {
  from_date: `${config.availableSeasons[0]}-01-01`,
  to_date: `${config.availableSeasons[0]}-12-31`,
  count: 10,
  from: 0,
}

const today = new Date();
const formattedToday = today.toISOString().split('T')[0];

export const initialGamesQuery: QueryType = {
  season: config.availableSeasons[0],
  from_date: formattedToday,
  asc: true,
}

export function generatePlaylistQueryFromParams(searchParams: URLSearchParams, initialQuery: QueryType | undefined) {

  let query: QueryType = structuredClone(initialQuery || {})

  const tagFromInitialQuery = initialQuery?.tags?.[0]?.action
  
  const seasonParam = searchParams.get("season");
  const tag = searchParams.get("tag") || tagFromInitialQuery
  
  const teamParam = searchParams.get("team")
  const playerParam = searchParams.get("player")
  const pageParam = searchParams.get("page");

  const tags = generateTags({tag, teamParam, playerParam})
  
  if (tags) query.tags = tags

  if (seasonParam) {
    const seasonInt = parseInt(seasonParam)
    query.from_date = `${seasonInt}-01-01`
    query.to_date = `${seasonInt}-12-31`
  }

  if (pageParam) {
    const page = Number(pageParam) || 1;
    const from = Math.min((page - 1) * 10);
    query.from = from;
  }

  // Team platform
  const teamPlatformId = config.team
  if (teamPlatformId) query = teamPlatformPlaylistQuery(query)
  
  return query;
}

export function generateGamesQueryFromParams (searchParams: URLSearchParams) {
  const params = searchParams

  const currentSeason = config.availableSeasons[0]

  const seasonParam = params.get("season");
  const teamParam = params.get("team");
  const typeParam = params.get("match_type");

  const query: QueryType = structuredClone(initialGamesQuery)

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

  // Team platform
  const teamPlatformId = config.team
  if (teamPlatformId) query.team_id = teamPlatformId

  return query
}

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

export function teamPlatformPlaylistQuery (videosCollectionQuery: QueryType) {
  
  let query = structuredClone(videosCollectionQuery)

  // Team platform
  const teamPlatformId = config.team

  if (teamPlatformId) {
    query.team_id = teamPlatformId
    const channelId = config.channel
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
  return query
}