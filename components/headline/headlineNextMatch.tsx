"use client"
import { GameType } from "@/types/dataTypes"
import Image from "next/image"
import { useCountDown } from "@/utilities/ClientSideUtils"
import { format } from 'date-fns';
import { getStadiumImage } from "@/utilities/imageUtil"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { getLeagueLogo } from "@/utilities/imageUtil"
import config from "@/config"
import "./headline.css"
import './headlineNextMatch.css'

interface HeadlineNextMatchProps {  
    show: boolean
    game: GameType
}

function HeadlineNextMatch({show, game}: HeadlineNextMatchProps) {

    const countdown = useCountDown(game.start_time)
    const t = useTranslations();
    const locale = useLocale();

    if (!show) return null

    const {home_team, visiting_team} = game
    const {days, hours, minutes, seconds} = countdown

    // Keep values deterministic across server and client
    const gameDate = format(game.date, 'EEE, dd MMM yyyy');
    const gameTime = game.start_time?.length >= 16 ? game.start_time.substring(11, 16) : ''

    const league = config.league
    const nextMatchStadium = getStadiumImage[league as keyof typeof getStadiumImage][home_team.id]
    
    const leagueLogo = getLeagueLogo[league as keyof typeof getLeagueLogo]

    const nextMatchCountdown = (
        <div className="headline-next-match-countdown">
            <div className="match-countdown-item">
                <div className="match-countdown-number">{days}</div>
                <div className="match-countdown-label">{t("days")}</div>
            </div>
            <div className="match-countdown-separator">:</div>
            <div className="match-countdown-item">
                <div className="match-countdown-number">{hours}</div>
                <div className="match-countdown-label">{t("hrs")}</div>
            </div>
            <div className="match-countdown-separator">:</div>
            <div className="match-countdown-item">
                <div className="match-countdown-number">{minutes}</div>
                <div className="match-countdown-label">{t("mins")}</div>
            </div>
            <div className="match-countdown-separator">:</div>
            <div className="match-countdown-item">
                <div className="match-countdown-number">{seconds}</div>
                <div className="match-countdown-label">{t("secs")}</div>
            </div>
        </div>
    )

    const nextMatch = (
      <div className="headline-next-match">
        <div className='headline-next-match-league'>
            <Image src={leagueLogo} alt="league logo" />
        </div>
        <div className="headline-next-match-date">{gameDate}</div>
        <div className="headline-next-match-time">{gameTime}</div>
        <div className="headline-next-match-teams">
            <div className="headline-next-match-team">
                <div className="headline-next-match-team-logo">
                    <Image src={home_team.logo_url} alt="team logo" fill sizes="()" />
                </div>
                <div className="headline-next-match-team-name">{home_team.short_name}</div>
            </div>
            <div className="headline-next-match-team">
                <div className="headline-next-match-team-logo">
                    <Image src={visiting_team.logo_url} alt="team logo" fill sizes="()" />
                </div>
                <div className="headline-next-match-team-name">{visiting_team.short_name}</div>
            </div>
        </div>
        {nextMatchCountdown}
        <Link href={`/${locale}/match/${game.id}`} className="match-center-button">
            {t("match center")}
        </Link>
      </div>
    )

    const nextMatchTitle = (
        <div className="headline-text next-match">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
    )

    return (
        <div className="headline-single">
            {nextMatchStadium && (
                <Image 
                    src={nextMatchStadium} 
                    alt="stadium" 
                    fill
                    priority
                    sizes="()"
                    className="headline-single-img blur-in"
                    data-aos="fade"
                    data-aos-duration="1000"
                />
            )}
            <div className="headline-content middle-container">
                {nextMatch}
                {nextMatchTitle}
            </div>
            <div className="headline-img-mask-left"></div>
            <div className="headline-img-mask-right"></div>
        </div>
    )
}

export default HeadlineNextMatch