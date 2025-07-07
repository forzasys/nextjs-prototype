import { onFetch } from "@/utilities/fetchApi";
import { QueryType } from "@/types/dataTypes";
import { generatePlaylistQueryFromParams } from "@/utilities/queryUtils";
import { Collection } from "./collection";
import { videoCollectionQueries } from "@/utilities/queryUtils";

type CollectionTitlesType = {
  [key: string]: string
}

export const collectionTitles: CollectionTitlesType = {
    "goal": "Goals",
    "assist": "Assists",
    "yellow card": "Yellow cards",
    "red card": "Red cards",
    "shot": "Shots",
    "latest": "Latest",
    "interviews": "Interviews",
}

interface VideoCollectionProps {
  params?: URLSearchParams | undefined
  collectionName: string
  showCollection?: boolean | true
}

export async function VideoCollection({collectionName, params, showCollection}: VideoCollectionProps) {
  
  if (!showCollection) return null;
  
  const initialCollectionQuery = videoCollectionQueries({collectionName});

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