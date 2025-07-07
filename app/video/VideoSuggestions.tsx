'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/utilities/fetchApi';
import Playlist from '@/components/playlist/playlist';
import { PlaylistType } from '@/types/dataTypes';
import { QueryType } from '@/types/dataTypes';
import { useParams } from 'next/navigation'
import { loadQueryFromSession } from '@/utilities/utils';
import "@/components/videosLibrary/videoCollection.css"

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

  let render

  const playlist = (
    <div className="collection-playlist-container">
      {collections.map((p: PlaylistType) => {
        return (
          <Playlist key={p.id} playlist={p} query={query}/>
        )
      })}
    </div>
  )

  if (isLoading) render = <div >Loading...</div>

  else render = playlist

  return (
    <div>
      <h2>Video Suggestions</h2>
      <div className="collection-container">
        <div className="collection-title">Video Suggestions</div>
        {render}
      </div>
    </div>
  )
} 

export default VideoSuggestions