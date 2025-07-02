import { onFetch } from "@/lib/fetchApi";
import { QueryType } from "@/types/dataTypes";
import { generatePlaylistQueryFromParams } from "@/utils/queryUtils";
import { Collection } from "./collection";
// import { teamPlatformPlaylistQuery } from "@/utils/queryUtils";
import config from '@/config';

export function initialCollectionQueries (collectionName: string) {

  const initialQuery: QueryType = {
    // from_date: `${config.availableSeasons[0]}-01-01`,
    // to_date: `${config.availableSeasons[0]}-12-31`,
    count: 8,
  }

  switch (collectionName) {

    case "goal":
      initialQuery.tags = [{ action: "goal" }]
      initialQuery.filters = ["official"]
      break

    case "yellow card":
      initialQuery.tags = [{ action: "yellow card" }]
      initialQuery.filters = ["official"]
      break

    case "red card":
      initialQuery.tags = [{ action: "red card" }]
      initialQuery.filters = ["official"]
      break

    case "shot":
      initialQuery.tags = [{ action: "shot" }]
      initialQuery.filters = ["official"]
      break

    case "latest":
      initialQuery.filters = ["~official","~live"]
      break

    case "interviews":
      initialQuery.tags = [{ action: "interview" }]
      break

    default:
      break
  }

  // Team platform
  // const teamPlatformId = config.team
  // if (teamPlatformId) {
    // if (initialQuery.filters) {
      // initialQuery.filters.push("team_vålerenga")
    // }
  // }

  return initialQuery
}

type CollectionTitlesType = {
  [key: string]: string
}

export const collectionTitles: CollectionTitlesType = {
    "goal": "Goals",
    "yellow card": "Yellow cards",
    "red card": "Red cards",
    "shot": "Shots",
    "latest": "Latest",
    "interviews": "Interviews",
}

interface VideoCollectionProps {
  params?: URLSearchParams | undefined
  collectionName: string
  hideCollection?: boolean | false
}

export async function VideoCollection({params, collectionName, hideCollection}: VideoCollectionProps) {
  
  if (hideCollection) return null;
  
  const initialCollectionQuery = initialCollectionQueries(collectionName);
  console.log("initialCollectionQuery", initialCollectionQuery) 
  let query: QueryType = {};

  if (params) {
    query = generatePlaylistQueryFromParams(params, initialCollectionQuery);
  }

  const isInitialQuery = !params || (JSON.stringify(query) === JSON.stringify(initialCollectionQuery))

  const playlistData = isInitialQuery ? await onFetch("playlist", initialCollectionQuery) : undefined;

  return (
    <Collection playlistData={playlistData} isInitialQuery={isInitialQuery} collectionName={collectionName} />
  )
}