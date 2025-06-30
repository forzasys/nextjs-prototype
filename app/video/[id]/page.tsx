import React from 'react'
import { onFetch } from '@/lib/fetchApi'

interface VideoPageProps {
  params: {
    id: string
  }
}

async function Page({ params }: VideoPageProps) {

  const { id } = params

  const playlistData = await onFetch(`/playlist/${id}`);
  const playlist = playlistData || {};

  console.log(id, playlist)
  
  return (
    <div>
        <div>Video</div>
        {playlist.description}
    </div>
  )
}

export default Page