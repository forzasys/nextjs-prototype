'use client';
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { onFetch } from '@/lib/fetchApi';
import { generatePlaylistQueryFromParams } from '@/utils/queryUtils';
import { PlaylistType } from '@/types/dataTypes';
import Playlist from '@/components/playlist/playlist';

interface VideosProps {
  playlistsData: PlaylistType[]
  isInitialQuery: boolean
}

function Videos({ playlistsData, isInitialQuery }: VideosProps) {

  const searchParams = useSearchParams();
  const query = generatePlaylistQueryFromParams(searchParams);

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;

  const pageStaleTimes: Record<number, number> = {
    1: 1000 * 30 * 1,  // Page 1: 30 secs
    2: 1000 * 60 * 10,  // Page 2: 10 min
  };
  
  const staleTime = pageStaleTimes[page] ?? 0;
  
  const { data, isLoading } = useQuery({
    queryKey: ['playlist', query],
    queryFn: () => onFetch("playlist", query),
    initialData: playlistsData,
    enabled: !isInitialQuery,
    staleTime: staleTime,
  });
  
  const playlists = data?.playlists || []

  console.log(playlists)
  
  const renderEvents = (
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
      {playlists.map((p: PlaylistType) => {
        return (
          <Playlist key={p.id} playlist={p} />
        )
      })}
      <br />
    </div>
  ) 

  const render = isLoading ? (
    <div style={{fontSize: "32px"}}>Loading...</div>
  ) : (
    renderEvents
  )

  return (
    <div style={{padding: "10px"}}>
      {render}
    </div>
  )
}

export default Videos