'use client';
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/lib/fetchApi';
import { useSearchParams } from 'next/navigation';
import { generatePlaylistQueryFromParams } from '@/utils/queryUtils';
import { PlaylistType } from '@/types/dataTypes';
import Playlist from '@/components/playlist/playlist';
import { collectionTitles, initialCollectionQueries } from './videoCollection';

interface VideoCollectionProps {
    playlistData?: PlaylistType[] | undefined
    isInitialQuery: boolean
    collectionName: string
}

export function Collection({playlistData, isInitialQuery, collectionName}: VideoCollectionProps) {

    const searchParams = useSearchParams();
    const initialCollectionQuery = initialCollectionQueries(collectionName);
    const query = generatePlaylistQueryFromParams(searchParams, initialCollectionQuery);
    // console.log("query", query);
    const { data, isLoading } = useQuery({
        queryKey: ['playlist', query],
        queryFn: () => onFetch("playlist", query),
        initialData: playlistData,
        enabled: !isInitialQuery,
        // staleTime: staleTime,
    });

    const collections = data?.playlists || [];

    const collectionTitle = collectionTitles[collectionName];

    const playlist = (
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
          {collections.map((p: PlaylistType) => {
            return (
              <Playlist key={p.id} playlist={p} />
            )
          })}
        </div>
    )

    const render = isLoading ? (
    <div style={{fontSize: "32px"}}>Loading...</div>
    ) : (
        playlist
    )

    if (!isLoading && collections.length === 0) {
        return <div>No data</div>
    }

    return (
        <div>
            <div>{collectionTitle}</div>
            <br />
            {render}
        </div>
    )
}

export default Collection