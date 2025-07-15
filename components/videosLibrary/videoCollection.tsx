"use client"
import { onFetch } from '@/utilities/fetchApi';
import { videoCollectionQueries } from '@/utilities/queryUtils';
import { useSearchParams } from 'next/navigation';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { generatePlaylistQueryFromParams } from '@/utilities/queryUtils';
import { useQuery } from '@tanstack/react-query';
import { Paging } from '../paging/paging';
import { PlaylistType, QueryType } from '@/types/dataTypes';
import Playlist from '../playlist/playlist';

interface CollectionProps {
    playlists: PlaylistType[]
    query: QueryType
}

function Collection ({playlists, query}: CollectionProps) {

    return (
        <div className="collection-playlist-container">
            {playlists.map((playlist: PlaylistType) => (
                <div key={playlist.id} className="collection-playlist-single">
                    <Playlist playlist={playlist} query={query} />
                </div>
            ))}
        </div>
    )
}

function VideoCollection({collectionName}: {collectionName: string}) {
    
    const {updateParam} = useUpdateSearchParam();
    const searchParams = useSearchParams();
    const pageParam = searchParams.get("page") || 1
    const initialCollectionQuery = videoCollectionQueries({collectionName});
    const query = generatePlaylistQueryFromParams(searchParams, initialCollectionQuery);

    // 16 results per page
    const resultsPerPage = 12
    query.count = resultsPerPage

    const { data, isLoading } = useQuery({
        queryKey: ['playlist', query],
        queryFn: () => onFetch("playlist", query),
        // staleTime: staleTime,
    });

    const onUpdatePage = (page: number) => {
        updateParam("page", page.toString())
    }

    const playlists = data?.playlists || []

    const totalPage = Math.ceil(data?.total / resultsPerPage) || 0

    if (isLoading) return <div className="middle-container">Loading...</div>
    
    return (
        <div className="collection-container middle-container">
            <div className="collection-total-results">Showing {data?.total} results</div>
            <Collection playlists={playlists} query={query}/>
            <Paging page={Number(pageParam)} pageCount={totalPage} onChange={onUpdatePage}/>
        </div>
    )
}

export default VideoCollection