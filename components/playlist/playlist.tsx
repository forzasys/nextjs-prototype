import React from 'react'
import Link from 'next/link'
import { PlaylistType } from '@/types/dataTypes'

interface PlaylistProps {
  playlist: PlaylistType
}

function Playlist({ playlist }: PlaylistProps) {

  return (
    <Link href={`/video/${playlist.id}`}>
        {playlist.description}
    </Link>
  )
}

export default Playlist