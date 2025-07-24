"use client"
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PlaylistType, QueryType } from '@/types/dataTypes'
import { saveQueryToSession, formatDuration } from '@/utilities/utils'
import classNames from 'classnames'
import { IoMdPlay } from "react-icons/io";
import "./playlist.css";

interface PlaylistProps {
  playlist: PlaylistType
  query?: QueryType
  smaller?: boolean
}

function Playlist({ playlist, query, smaller }: PlaylistProps) {

  const router = useRouter()

  const [isGameHovered, setIsGameHovered] = useState(false);

  const onClickVideo = () => {
    if (query) {
      console.log("setting query", query)
      saveQueryToSession(query)
    }
  }

  const onGameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/match/${game.id}`)
  }

  // console.log("playlist", playlist)

  const game = playlist.game

  const duration = formatDuration(playlist.duration_ms / 1000)

  return (
    <Link 
      href={`/video/${playlist.id}`} 
      className={classNames("playlist-single-link", {
        "game-hovered": isGameHovered,
        "smaller": smaller,
      })}>
      <div onClick={onClickVideo} className="playlist-single">
        <div className="playlist-image">
          <Image 
            src={playlist.thumbnail_url} 
            alt="playlist thumbnail"
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="playlist-thumbnail"
          />
          <div className="playlist-duration-cont">
            <div className="playlist-duration-play-icon">
              <IoMdPlay />
            </div>
            <div className="playlist-duration">
              <div className="playlist-duration-text">{duration}</div>
              <div className="playlist-duration-hover"></div>
            </div>
          </div>
        </div>
        <div className="playlist-description">{playlist.description}</div>
        <div className="playlist-line"></div>
        <div className="playlist-info">
          <div className="playlist-info-type">Event</div>
          {game && (
            <div 
              className="playlist-info-match" 
              onClick={onGameClick}
              onMouseEnter={() => setIsGameHovered(true)}
              onMouseLeave={() => setIsGameHovered(false)}
            >
              <Image src={game.home_team.logo_url} alt="home team logo" width={30} height={30} />
              <div className="playlist-info-match-score">
                {game.home_team_goals} - {game.visiting_team_goals}
              </div>
              <Image src={game.visiting_team.logo_url} alt="visiting team logo" width={30} height={30} />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default Playlist