import { QueryType } from "@/types/dataTypes";
import { SearchParamsType } from "@/types/dataTypes";
import config from '@/config';

export type InitialCollectionParams = {
  collectionName: string | null;
}

export function videoCollectionQueries ({collectionName}: InitialCollectionParams) {

  const query: QueryType = {}

  switch (collectionName) {

    case "assist":
      query.tags = [{ action: "goal", "assist by": {id: ""} }]
      query.filters = ["official"]
      break

    case "goal":
      query.tags = [{ action: "goal" }]
      query.filters = ["official"]
      break

    case "penalty":
      query.tags = [
        {action: "goal", "shot type": {"value": "penalty"}},
        {action: "shot", "shot type": {"value": "penalty"}}
      ]
      query.filters = ["official"]
      break
                
    case "red card":
      query.tags = [{ action: "red card" }]
      query.filters = ["official"]
      break

    case "shot":
      query.tags = [{ action: "shot" }]
      query.filters = ["official"]
      break

    case "yellow card":
      query.tags = [{ action: "yellow card" }]
      query.filters = ["official"]
      break

    case "latest":
      query.filters = ["~official","~live"]
      break

    case "interviews":
      query.tags = [{ action: "interview" }]
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

  query.count = 8

  return query
}

const today = new Date();
const formattedToday = today.toISOString().split('T')[0];

export const initialGamesQuery: QueryType = {
  season: config.availableSeasons[0],
  from_date: formattedToday,
  asc: true,
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
    const from = Math.min((page - 1) * 10);
    query.from = from;
  }

  // Handle filters
  if (eventParam) query.filters = ["event"]
  
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

// export function teamPlatformPlaylistQuery (videosCollectionQuery: QueryType, teamId: number | string) {
  // 
  // let query = structuredClone(videosCollectionQuery)
  // console.log(query)
  // query.team_id = Number(teamId)
  // const channelId = config.channel
  // const queryTags = query?.tags
  // if (queryTags) {
    // const updatedTags = queryTags.map((tag: TagsType) => ({
        // ...tag,
        // team: { id: Number(teamId) },
    // }));
    // query = {
        // ...query,
        // tags: updatedTags
    // };
  // } else {
      // query = {
          // ...query,
          // channels: channelId
      // };
  // }
  // return query
// }