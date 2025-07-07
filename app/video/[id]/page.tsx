import React from 'react'
import { onFetch } from '@/utilities/fetchApi'

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
      {playlist.description}
    </div>
  )
}

export default Page