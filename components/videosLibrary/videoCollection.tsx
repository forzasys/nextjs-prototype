"use client"
import { onFetch } from '@/utilities/fetchApi';
import { videoCollectionQueries } from '@/utilities/queryUtils';
import { useSearchParams } from 'next/navigation';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { generatePlaylistQueryFromParams } from '@/utilities/queryUtils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Paging } from '../paging/paging';
import { PlaylistType, QueryType } from '@/types/dataTypes';
import Playlist from '../playlist/playlist';
import { useTranslations } from 'next-intl';
import "./videoCollection.css"

interface CollectionProps {
    playlists: PlaylistType[]
    query: QueryType
}

function Collection ({playlists, query}: CollectionProps) {
    return (
        <div className="collection-playlist-container">
            {playlists.map((playlist: PlaylistType) => {
                const session = {playlistId: playlist.id, query}
                return (
                    <div key={playlist.id} className="collection-playlist-single">
                        <Playlist playlist={playlist} session={session} box />
                    </div>
                )
            })}
        </div>
    )
}

function VideoCollection({collectionName}: {collectionName: string}) {
    
    const {updateParam} = useUpdateSearchParam();
    const searchParams = useSearchParams();
    const pageParam = searchParams.get("page") || 1
    const initialCollectionQuery = videoCollectionQueries({collectionName});
    const query = generatePlaylistQueryFromParams(searchParams, initialCollectionQuery);
    const t = useTranslations();

    // 16 results per page
    const resultsPerPage = 12
    query.count = resultsPerPage

    type PlaylistResponse = { playlists: PlaylistType[]; total: number };

    const { data, isLoading } = useQuery<PlaylistResponse>({
        queryKey: ['playlist', query],
        queryFn: () => onFetch("playlist", query),
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        placeholderData: keepPreviousData,
    })

    const onUpdatePage = (page: number) => {
        updateParam("page", page.toString())
    }

    const playlists = data?.playlists || []

    const totalResults = typeof data?.total === 'number' ? data.total : 0
    const totalPage = Math.ceil(totalResults / resultsPerPage)

    if (isLoading) return <div className="middle-container">Loading...</div>
    
    return (
        <div className="collection-container middle-container">
            <div className="collection-total-results">{t("showing")} {totalResults} {t("results")}</div>
            <Collection playlists={playlists} query={query}/>
            <Paging page={Number(pageParam)} pageCount={totalPage} onChange={onUpdatePage}/>
        </div>
    )
}

export default VideoCollection