import React from 'react'
import { onFetch } from '@/utilities/fetchApi'
import VideoPlayer from '@/components/videoPlayer/videoPlayer'
import VideoTags from './videoTags'
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { formatDuration, formatReadableDate } from '@/utilities/utils';
import Image from 'next/image';
import "./videoPage.css"

interface VideoPageProps {
  params: {
    id: string
  }
}

export const revalidate = 180;

export default async function Page({ params }: VideoPageProps) {

  const t = await getTranslations();
  const locale = await getLocale()

  const playlistId = params.id;

  const playlistData = await onFetch(`/playlist/${playlistId}`);
  const playlist = playlistData || {};

  const duration = formatDuration(playlist.duration_ms / 1000)
  const date = formatReadableDate(playlist.date)

  const homeTeam = playlist.game?.home_team
  const awayTeam = playlist.game?.visiting_team

  const game = playlist.game && (
    <Link href={`/${locale}/match/${playlist.game.id}`} className="video-page-game">
      <div className="video-page-team-name">
        {homeTeam.name}
      </div>
      <div className="video-page-team-logo">
        <Image src={homeTeam.logo_url} alt={homeTeam.name} fill />
      </div> 
      <div className="video-page-team-score">
        {playlist.game.home_team_goals}
      </div>
      <div className="video-page-team-score-separator">
        -
      </div>
      <div className="video-page-team-score">
        {playlist.game.visiting_team_goals}
      </div>
      <div className="video-page-team-logo">
        <Image src={awayTeam.logo_url} alt={awayTeam.name} fill />
      </div>
      <div className="video-page-team-name">
        {awayTeam.name}
      </div>
    </Link>
  )

  return (
    <div className="video-page-cont">
      <div className="video-page middle-container">
        <VideoPlayer playlist={playlist} />
        <div className="video-page-content">
          <div className="video-page-type-and-date">
            <div className="video-page-video-type">
              {t("event")}
            </div>
            <div className="video-page-date">
              {date}
            </div>
          </div>
          <div className="video-page-title">
            <div className="video-page-duration">
              {duration}
            </div>
            <div className="video-page-desc">
              {playlist.description}
            </div>
          </div>
          <div className="video-page-content-bottom">
            <VideoTags playlist={playlist} />
            {game}
          </div>
        </div>
      </div>
    </div>
  )
}