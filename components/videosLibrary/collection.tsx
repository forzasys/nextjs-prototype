'use client';
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/utilities/fetchApi';
import { useSearchParams } from 'next/navigation';
import { generatePlaylistQueryFromParams } from '@/utilities/queryUtils';
import { PlaylistType } from '@/types/dataTypes';
import { videoCollectionQueries } from '@/utilities/queryUtils';
import { collectionTitles } from './videoCollection';
import Playlist from '@/components/playlist/playlist';
import classNames from 'classnames';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "./videoCollection.css";

interface VideoCollectionProps {
    playlistData?: PlaylistType[] | undefined
    isInitialQuery: boolean
    collectionName: string
    visibleCollections: string[]
}

export function Collection({playlistData, isInitialQuery, collectionName, visibleCollections}: VideoCollectionProps) {

    const searchParams = useSearchParams();
    const initialCollectionQuery = videoCollectionQueries({collectionName});
    const query = generatePlaylistQueryFromParams(searchParams, initialCollectionQuery);

    const { data, isLoading } = useQuery({
        queryKey: ['playlist', query],
        queryFn: () => onFetch("playlist", query),
        initialData: playlistData,
        enabled: !isInitialQuery || !playlistData,
        // staleTime: staleTime,
    });

    const collections = data?.playlists || [];

    const collectionTitle = collectionTitles[collectionName] || collectionName;

    const collectionIndex = visibleCollections.indexOf(collectionName)
    let collectionGroup = ""

    if (collectionIndex === 0) {
        collectionGroup = "top-first"
    }
    if (collectionIndex === 2 || collectionIndex === 3) {
        collectionGroup = "primary-color"
    }

    const playlist = (
        <div className="collection-playlist-container">
          {collections.map((p: PlaylistType) => {
            return (
              <Playlist key={p.id} playlist={p} query={query}/>
            )
          })}
          <div className="collection-playlist-slider">
            <div className="collection-playlist-slider-button">
              <MdOutlineArrowForwardIos/>
            </div>
          </div>
        </div>
    )

    let render

    if (isLoading) render = <div >Loading...</div>

    if (collections.length === 0) render = <div>0 videos</div>

    else render = playlist

    return (
        <div className={classNames("collection-container", collectionGroup)}>
          <div className="collection-single middle-container">
            <div className="collection-title-container">
              <div className="collection-title">{collectionTitle}</div>
              <div className="collection-title-more">
                More
                <MdOutlineArrowForwardIos/>
              </div>
            </div>
            {render}
          </div>
        </div>
    )
}

export default Collection