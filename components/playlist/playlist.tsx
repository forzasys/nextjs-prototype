import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PlaylistType } from '@/types/dataTypes'
import "./playlist.css";

interface PlaylistProps {
  playlist: PlaylistType
}

function Playlist({ playlist }: PlaylistProps) {

  return (
    <div className="playlist-single">
      <Link href={`/video/${playlist.id}`} style={{ display: 'block' }}>
        <div className="playlist-image">
          <Image 
            src={playlist.thumbnail_url} 
            alt="playlist thumbnail"
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="playlist-thumbnail"
          />
        </div>
        <div>{playlist.description}</div>
      </Link>
    </div>
  )
}

export default Playlist