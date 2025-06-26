import { onFetch } from "@/lib/fetchApi";
import { PlaylistQueryType } from "@/types/dataTypes";
import { generateVideosCollectionQuery } from "@/utils/queryUtils";

type CollectionQueriesType = {
  [key: string]: PlaylistQueryType
}

type CollectionTitlesType = {
  [key: string]: string
}

const collectionQueries: CollectionQueriesType = {
    "goals": {
        tags: [{ action: "goal" }],
        // filters: ["events"],
        count: 12,
    },
    "latest": {
        filters: ["~official","~live"],
        count: 12,
    },
    "interviews": {
        tags: [{ action: "interview" }],
        count: 12,
    },
}

const collectionTitles: CollectionTitlesType = {
    "goals": "All goals",
    "latest": "Latest",
    "interviews": "Interviews",
}

export async function getVideosCollection(collectionName: string) {

    const videosCollectionQuery = collectionQueries[collectionName];
    const query = generateVideosCollectionQuery(videosCollectionQuery)
    const collectionTitle = collectionTitles[collectionName];

    const collectionData = await onFetch("playlist", query);
    const collection = collectionData?.playlists || [];

    return [collectionTitle, collection];
}