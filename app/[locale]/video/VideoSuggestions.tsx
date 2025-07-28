'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/utilities/fetchApi';
import Playlist from '@/components/playlist/playlist';
import { PlaylistType } from '@/types/dataTypes';
import { QueryType } from '@/types/dataTypes';
import { useParams } from 'next/navigation';
import { generateTitleFromQuery, loadQueryFromSession } from '@/utilities/utils';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import "@/components/videosLibrary/videoCollection.css";
import "./videoPlayer.css";

function VideoSuggestions() {

  const params = useParams()
  const videoId = params.id as string

  const [query, setQuery] = useState<QueryType>({});

  useEffect(() => {
    try {
      const queryFromLocalSession = loadQueryFromSession();
      if (queryFromLocalSession) setQuery(queryFromLocalSession)
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
    }
  }, [videoId]);

  const { data, isLoading } = useQuery({
    queryKey: ['playlist', query],
    queryFn: () => onFetch("playlist", query),
  });

  const collections = data?.playlists || [];

  const videoSuggestionTitle = collections.length !== 0 && generateTitleFromQuery(query, collections[0]) || "Video suggestions"

  let render

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

  if (isLoading) render = <div >Loading...</div>

  else render = playlist

  return (
    <div className="collection-slide-container">
      <div className="collection-single middle-container">
        <div className="collection-title-container">
          <div className="video-suggestions-title">{videoSuggestionTitle}</div>
        </div>
        {render}
      </div>
    </div>
  )
} 

export default VideoSuggestions