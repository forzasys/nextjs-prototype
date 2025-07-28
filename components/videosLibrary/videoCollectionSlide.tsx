import { onFetch } from "@/utilities/fetchApi";
import { QueryType } from "@/types/dataTypes";
import { generatePlaylistQueryFromParams } from "@/utilities/queryUtils";
import CollectionSlide from "./collectionSlide";
import { videoCollectionQueries } from "@/utilities/queryUtils";

type CollectionTitlesType = {
  [key: string]: string
}

export const collectionTitles: CollectionTitlesType = {
    "assist": "assists",
    "goal": "goals",
    "goalkeeperevent": "goalkeeper events",
    "penalty": "penalties",
    "red card": "red cards",
    "save": "saves",
    "shootoutpenaltyshot": "shootout penalty shots",
    "shot": "shots",
    "yellow card": "yellow cards",
}

interface VideoCollectionProps {
  collectionName: string
  params?: URLSearchParams | undefined
  visibleCollections?: string[]
  showCollection?: boolean | true
}

export async function VideoCollectionSlide({collectionName, params, visibleCollections, showCollection}: VideoCollectionProps) {
  
  if (!showCollection) return null;
  
  const initialCollectionQuery = videoCollectionQueries({collectionName});
  // collection slide doesn't need all the videos
  initialCollectionQuery.count = 9

  let query: QueryType = {};

  if (params) {
    query = generatePlaylistQueryFromParams(params, initialCollectionQuery);
  }

  const isInitialQuery = !params || (JSON.stringify(query) === JSON.stringify(initialCollectionQuery))

  const playlistData = isInitialQuery ? await onFetch("playlist", initialCollectionQuery) : undefined;

  return (
    <CollectionSlide playlistData={playlistData} isInitialQuery={isInitialQuery} collectionName={collectionName} visibleCollections={visibleCollections} />
  )
}