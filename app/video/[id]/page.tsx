import React from 'react'
import { onFetch } from '@/utilities/fetchApi'
import VideoPlayer from '@/components/videoPlayer/videoPlayer'

interface VideoPageProps {
  params: {
    id: string
  }
}

async function Page({ params }: VideoPageProps) {
  const { id } = params

  const playlistData = await onFetch(`/playlist/${id}`);
  const playlist = playlistData || {};

  return (
    <div>
      <h2>Video</h2>
      <VideoPlayer playlist={playlist} />
    </div>
  )
}

export default Page