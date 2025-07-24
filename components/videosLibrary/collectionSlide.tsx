'use client';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/utilities/fetchApi';
import { useSearchParams } from 'next/navigation';
import { generatePlaylistQueryFromParams } from '@/utilities/queryUtils';
import { PlaylistType } from '@/types/dataTypes';
import { videoCollectionQueries } from '@/utilities/queryUtils';
import { collectionTitles } from './videoCollectionSlide';
import Playlist from '@/components/playlist/playlist';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "./videoCollection.css";

interface VideoCollectionProps {
    playlistData?: PlaylistType[] | undefined
    isInitialQuery: boolean
    collectionName: string
    visibleCollections?: string[]
}

export function CollectionSlide({playlistData, isInitialQuery, collectionName, visibleCollections}: VideoCollectionProps) {

  useEffect(() => {
    AOS.init({
      offset: 50,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCollectionQuery = videoCollectionQueries({collectionName});
  const query = generatePlaylistQueryFromParams(searchParams, initialCollectionQuery);

  // collection slide doesn't need all the videos
  query.count = 9

  const { data, isLoading } = useQuery({
      queryKey: ['playlist', query],
      queryFn: () => onFetch("playlist", query),
      initialData: playlistData,
      enabled: !isInitialQuery || !playlistData,
      // staleTime: staleTime,
  });

  const collections = data?.playlists || [];

  const onClickMore = () => {
    router.push(`/videos?event=${collectionName}`);
  }

  const collectionTitle = collectionTitles[collectionName] || collectionName;

  const collectionIndex = visibleCollections?.indexOf(collectionName)
  let collectionGroup = ""

  if (collectionIndex === 0) {
      collectionGroup = "top-first"
  }
  if (collectionIndex === 2 || collectionIndex === 3) {
      collectionGroup = "primary-color"
  }

  const playlist = (
    <div className="collection-slide-playlist-container">
      {collections.map((p: PlaylistType) => {
        return (
          <div key={p.id} className="collection-slide-playlist-single">
            <Playlist playlist={p} query={query}/>
          </div>
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
    <div 
        className={classNames("collection-slide-container", collectionGroup)} 
      data-aos="fade-up"
      data-aos-delay={collectionIndex && collectionIndex <= 1 ? collectionIndex * 100 : 0}
    >
      <div className="collection-single middle-container">
        <div className="collection-title-container">
          <div className="collection-title">{collectionTitle}</div>
          <button onClick={onClickMore} className="collection-title-more">
            More
            <MdOutlineArrowForwardIos/>
          </button>
        </div>
        {render}
      </div>
    </div>
  )
}

export default CollectionSlide