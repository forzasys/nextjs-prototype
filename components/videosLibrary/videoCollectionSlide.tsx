import { onFetch } from "@/utilities/fetchApi";
import { generatePlaylistQueryFromParams } from "@/utilities/queryUtils";
import CollectionSlide from "./collectionSlide";
import { videoCollectionQueries } from "@/utilities/queryUtils";
// import { useSearchParams } from "next/navigation";

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
  searchParams: URLSearchParams
  visibleCollections: string[]
  showCollection?: boolean | true
}

export async function VideoCollectionSlide({searchParams, visibleCollections}: VideoCollectionProps) {

  // Build the same queriesArray structure
  const queriesArray = visibleCollections.map((collection) => {
    let collectionQuery = videoCollectionQueries({collectionName: collection})
    collectionQuery = generatePlaylistQueryFromParams(searchParams, collectionQuery);
    collectionQuery.count = 9
    
    return {
      collection, // Keep track of which collection this is for
      query: collectionQuery
    }
  });

  // Execute all queries in parallel using Promise.all
  const collectionsData = await Promise.all(
    queriesArray.map(async ({collection, query}) => {
      try {
        const data = await onFetch('playlist', query);
        return {
          collection,
          data: data?.playlists || [],
          error: null
        };
      } catch (error) {
        console.error(`Failed to fetch ${collection}:`, error);
        return {
          collection,
          data: [],
          error: error
        };
      }
    })
  );

  // Now you have all the data for your collections
  const allCollections = collectionsData.map(({collection, data}, index) => (
    <CollectionSlide 
      key={collection} 
      collectionName={collection}
      playlists={data}
      query={queriesArray[index].query}
      index={index}
    />
  ));

  return allCollections;
} 