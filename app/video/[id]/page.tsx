import React from 'react'
import { onFetch } from '@/utilities/fetchApi'
import VideoPlayer from '@/components/videoPlayer/videoPlayer'

interface VideoPageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: VideoPageProps) {

  const resolvedParams = await Promise.resolve(params);
  const playlistId = resolvedParams.id;

  const playlistData = await onFetch(`/playlist/${playlistId}`);
  const playlist = playlistData || {};

  return (
    <div className="middle-container">
      <h2>Video</h2>
      <VideoPlayer playlist={playlist} />
    </div>
  )
}