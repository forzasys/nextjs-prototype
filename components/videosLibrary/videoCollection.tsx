import { onFetch } from "@/lib/fetchApi";
import { QueryType } from "@/types/dataTypes";
import { generatePlaylistQueryFromParams } from "@/utils/queryUtils";
import { Collection } from "./collection";
import Config from "@/lib/config";

export function initialCollectionQueries (collectionName: string) {

  const initialQuery: QueryType = {
    from_date: `${Config.availableSeasons[0]}-01-01`,
    to_date: `${Config.availableSeasons[0]}-12-31`,
    count: 8,
  }

  switch (collectionName) {

    case "goal":
      initialQuery.tags = [{ action: "goal" }]
      initialQuery.filters = ["event"]
      break

    case "yellow card":
      initialQuery.tags = [{ action: "yellow card" }]
      initialQuery.filters = ["event"]
      break

    case "red card ":
      initialQuery.tags = [{ action: "red card" }]
      initialQuery.filters = ["event"]
      break

    case "shot":
      initialQuery.tags = [{ action: "shot" }]
      initialQuery.filters = ["event"]
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

  return initialQuery
}

type CollectionTitlesType = {
  [key: string]: string
}

export const collectionTitles: CollectionTitlesType = {
    "goal": "All goals",
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