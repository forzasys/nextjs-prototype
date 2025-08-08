'use client';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/utilities/fetchApi';
import Playlist from '@/components/playlist/playlist';
import { PlaylistType } from '@/types/dataTypes';
import { QueryType } from '@/types/dataTypes';
import { loadQueryFromSession } from '@/utilities/utils';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import "@/components/videosLibrary/videoCollection.css";
import "./videoPlayer.css";
import "./video.css";

function VideoSuggestions() {

  const pathname = usePathname();
  const videoId = useMemo(() => pathname?.split('/').filter(Boolean).pop(), [pathname]);

  const [query, setQuery] = useState<QueryType>({});

  useEffect(() => {
    if (!videoId) return;
    try {
      const queryFromLocalSession = loadQueryFromSession(videoId);
      if (queryFromLocalSession) setQuery(queryFromLocalSession)
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
    }
  }, [videoId]);

  const { data, isLoading } = useQuery({
    queryKey: ['playlist', query],
    queryFn: () => onFetch("playlist", query),
    enabled: Boolean(videoId && Object.keys(query).length > 0),
    staleTime: 3 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const collections = data?.playlists || []

  let render

  const playlist = (
    <div className="collection-slide-playlist-container">
      {collections.map((p: PlaylistType) => {
        const session = {playlistId: p.id, query}
        return (
          <div key={p.id} className="collection-slide-playlist-single">
            <Playlist playlist={p} session={session} />
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
    <div className="video-suggestions-container middle-container">
      <div className="collection-title-container">
        <div className="video-suggestions-title">Related videos</div>
      </div>
      {render}
    </div>
  )
} 

export default VideoSuggestions