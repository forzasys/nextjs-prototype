import { QueryType } from "@/types/dataTypes";
import { SearchParamsType } from "@/types/dataTypes";
import config from '@/config';

export type InitialCollectionParams = {
  collectionName: string | null;
}

export function videoCollectionQueries ({collectionName}: InitialCollectionParams) {

  const query: QueryType = {}

  switch (collectionName) {
    
    // Football
    case "assist":
      query.tags = [{ action: "goal", "assist by": {id: ""} }]
      query.filters = ["official"]
      break

    case "goal":
      query.tags = [{ action: "goal" }]
      query.filters = ["official", "event"]
      break
    
    case "penalty":
      query.tags = [{ action: "penalty" }]
      query.filters = ["official", "event"]
      break

    case "penalty goal":
      query.tags = [
        {action: "goal", "shot type": {"value": "penalty"}},
        {action: "shot", "shot type": {"value": "penalty"}}
      ]
      query.filters = ["official", "event"]
      break
                
    case "red card":
      query.tags = [{ action: "red card" }]
      query.filters = ["official", "event"]
      break
    
    case "save":
      query.tags = [{"action":"shot", "shot result":{"value":"saved"}}]
      query.filters = ["official", "event"]
      break

    case "shot":
      query.tags = [{ action: "shot" }]
      query.filters = ["official", "event"]
      break

    case "yellow card":
      query.tags = [{ action: "yellow card" }]
      query.filters = ["official", "event"]
      break

    case "highlights":
      query.filters = ["playlist"]
      query.orderby = "created"
      query.all_leagues = true
      query.include_channels = true
      query.include_featured_flag = true
      query.from = 0
      query.to_date = "2025-07-17T12:30:00.000Z"
      break

    // case "latest":
      // query.filters = ["~official","~live"]
      // break

    // case "interviews":
      // query.tags = [{ action: "interview" }]
      // break

    // Hockey
    case "goalkeeperevent":
      query.tags = [{ action: "goalkeeperevent" }]
      break

    case "shootoutpenaltyshot":
      query.tags = [{ action: "shootoutpenaltyshot" }]
      break

    default:
      break
  }

  const teamPlatformId = config.team
  const isTeamPlatform = !!teamPlatformId

  if (isTeamPlatform) {
    query.tags = query?.tags?.map(tag => ({
      ...tag,
      team: { id: teamPlatformId }
    }));
  }

  return query
}

export function generatePlaylistQueryFromParams(searchParams: URLSearchParams, initialQuery: QueryType | undefined) {
  
  const query: QueryType = structuredClone(initialQuery) || {}

  const seasonParam = searchParams.get("season");
  const eventParam = searchParams.get("event");
  const teamParam = searchParams.get("team");
  const playerParam = searchParams.get("player");
  const pageParam = searchParams.get("page");

  const teamPlatformId = config.team
  const isTeamPlatform = !!teamPlatformId

  if (teamParam && !isTeamPlatform) {
    query.tags = query?.tags?.map(tag => ({
      ...tag,
      team: { id: Number(teamParam) }
    }));
  }
    
  if (playerParam && !!query.tags) {

    let playerType: string = "player"

    if (query.tags[0].action === "goal") {
      playerType = "scorer"
      if (query.tags[0]["assist by"]) {
        playerType = "assist by"
      }
    }
    
    query.tags = query?.tags?.map(tag => ({
      ...tag,
      [playerType]: { id: Number(playerParam) }
    }));
  }

  if (seasonParam) {
    const seasonInt = parseInt(seasonParam)
    query.from_date = `${seasonInt}-01-01`
    query.to_date = `${seasonInt}-12-31`
  }

  if (pageParam) {
    const page = Number(pageParam) || 1;
    const from = Math.min((page - 1) * 12);
    query.from = from;
  }

  // Handle filters
  if (eventParam) query.filters = ["event"]
  
  return query;
}

const today = new Date();
const formattedToday = today.toISOString().split('T')[0];

export const initialGamesQuery: QueryType = {
  season: config.availableSeasons[0],
  from_date: formattedToday,
  count: 100,
  asc: true,
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