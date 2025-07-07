import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PlaylistType, QueryType } from '@/types/dataTypes'
import { saveQueryToSession } from '@/utilities/utils'
import "./playlist.css";

interface PlaylistProps {
  playlist: PlaylistType
  query?: QueryType
}

function Playlist({ playlist, query }: PlaylistProps) {

  const onClickVideo = () => {
    if (query) {
      console.log("setting query", query)
      saveQueryToSession(query)
    }
  }

  return (
    <Link href={`/video/${playlist.id}`} className="playlist-single">
      <div onClick={onClickVideo} className="playlist-image">
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
  )
}

export default Playlist