"use client"
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PlaylistType, QueryType } from '@/types/dataTypes'
import { saveQueryToSession, formatDuration, formatReadableDate } from '@/utilities/utils'
import 'aos/dist/aos.css';
import { useLocale, useTranslations } from 'next-intl';
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
  const locale = useLocale()

  const [isGameHovered, setIsGameHovered] = useState(false);
  const t = useTranslations();

  const onClickVideo = () => {
    if (query) {
      console.log("setting query", query)
      saveQueryToSession(query)
    }
    router.push(`/${locale}/video/${playlist.id}`)
  }

  const onGameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/${locale}/match/${game.id}`)
  }

  // console.log("playlist", playlist)

  const game = playlist.game

  const duration = formatDuration(playlist.duration_ms / 1000)

  return (
    <div 
      onClick={onClickVideo}
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
        <div className="playlist-event-type">{t("event")}</div>
        <div className="playlist-description">{playlist.description}</div>
        <div className="playlist-line"></div>
        <div className="playlist-info">
          <div className="playlist-date">{formatReadableDate(playlist.date)}</div>
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
    </div>
  )
}

export default Playlist