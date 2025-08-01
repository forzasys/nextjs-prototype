"use client"
import { onFetch } from "@/utilities/fetchApi";
import { useQueries } from "@tanstack/react-query";
import { generatePlaylistQueryFromParams } from "@/utilities/queryUtils";
import CollectionSlide from "./collectionSlide";
import { videoCollectionQueries } from "@/utilities/queryUtils";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

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
  visibleCollections: string[]
  showCollection?: boolean | true
}

export function VideoCollectionSlide({visibleCollections}: VideoCollectionProps) {
  
  const searchParams = useSearchParams();

  // Memoize the queries array to prevent constant re-creation
  const queriesArray = useMemo(() => {
    return visibleCollections.map((collection) => {
      let collectionQuery = videoCollectionQueries({collectionName: collection})
      collectionQuery = generatePlaylistQueryFromParams(searchParams, collectionQuery);
      collectionQuery.count = 9
      
      return {
        queryKey: ['playlist', collection, Object.entries(Object.fromEntries(searchParams)).toString()],
        queryFn: () => onFetch('playlist', collectionQuery),
        staleTime: 3 * 60 * 1000,
      }
    });
  }, [visibleCollections, searchParams]);

  const queries = useQueries({
    queries: queriesArray,
  });

  const allCollections = visibleCollections.map((collectionName, index) => {
    return (
      <CollectionSlide 
        key={collectionName} 
        collectionName={collectionName}
        visibleCollections={visibleCollections}
        playlists={queries[index].data?.playlists}
      />
    )
  })

  return allCollections
  
}