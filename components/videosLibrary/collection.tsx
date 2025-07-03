'use client';
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/utilities/fetchApi';
import { useSearchParams } from 'next/navigation';
import { generatePlaylistQueryFromParams } from '@/utilities/queryUtils';
import { PlaylistType } from '@/types/dataTypes';
import Playlist from '@/components/playlist/playlist';
import { collectionTitles, initialCollectionQueries } from './videoCollection';
import "./videoCollection.css";

interface VideoCollectionProps {
    playlistData?: PlaylistType[] | undefined
    isInitialQuery: boolean
    collectionName: string
}

export function Collection({playlistData, isInitialQuery, collectionName}: VideoCollectionProps) {

    const searchParams = useSearchParams();
    const initialCollectionQuery = initialCollectionQueries(collectionName);
    const query = generatePlaylistQueryFromParams(searchParams, initialCollectionQuery);

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
        <div className="collection-playlist-container">
          {collections.map((p: PlaylistType) => {
            return (
              <Playlist key={p.id} playlist={p} />
            )
          })}
        </div>
    )

    let render

    if (isLoading) render = <div >Loading...</div>

    if (collections.length === 0) render = <div>0 videos</div>

    else render = playlist

    return (
        <div className="collection-container">
            <div className="collection-title">{collectionTitle}</div>
            {render}
        </div>
    )
}

export default Collection