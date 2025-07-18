"use client"
import { GameType } from "@/types/dataTypes"
import config from "@/config"
import Image from "next/image"
import { useCountDown } from "@/utilities/ClientSideUtils"
import { useEffect, useState } from "react"
import { format, parseISO } from 'date-fns';
import { getStadiumImage } from "@/utilities/imageUtil"

interface HeadlineNextMatchProps {  
    game: GameType
    translate: string
}

function HeadlineNextMatch({translate, game}: HeadlineNextMatchProps) {

    const [isMounted, setIsMounted] = useState(false)
    const countdown = useCountDown(game.start_time)
    
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    const {home_team, visiting_team} = game
    const {days, hours, minutes, seconds} = countdown

    // console.log(home_team)

    const gameDate = format(game.date, 'EEE, dd MMM yyyy');
    const gameTime = format(parseISO(game.start_time), 'HH:mm')
    const nextMatchStadium = getStadiumImage[home_team.short_name]

    const nextMatchCountdown = (
        <div className="headline-next-match-countdown">
            <div className="match-countdown-item">
                <div className="match-countdown-number">{days}</div>
                <div className="match-countdown-label">days</div>
            </div>
            <div className="match-countdown-separator">:</div>
            <div className="match-countdown-item">
                <div className="match-countdown-number">{hours}</div>
                <div className="match-countdown-label">hrs</div>
            </div>
            <div className="match-countdown-separator">:</div>
            <div className="match-countdown-item">
                <div className="match-countdown-number">{minutes}</div>
                <div className="match-countdown-label">mins</div>
            </div>
            <div className="match-countdown-separator">:</div>
            <div className="match-countdown-item">
                <div className="match-countdown-number">{seconds}</div>
                <div className="match-countdown-label">secs</div>
            </div>
        </div>
    )

    const nextMatch = (
      <div className="headline-next-match">
        <div className="headline-next-match-date">{gameDate}</div>
        <div className="headline-next-match-league">{config.league}</div>
        <div className="headline-next-match-teams">
            <div className="headline-next-match-team">
                <Image src={home_team.logo_url} alt="team logo" width={90} height={90}/>
                <div className="headline-match-team">{home_team.short_name}</div>
            </div>
            <div className="headline-next-match-time">{gameTime}</div>
            <div className="headline-next-match-team">
                <Image src={visiting_team.logo_url} alt="team logo" width={90} height={90}/>
                <div className="headline-match-team">{visiting_team.short_name}</div>
            </div>
        </div>
        {nextMatchCountdown}
        <div className="headline-match-center">
            Match center
        </div>
      </div>
    )

    return (
        <div style={{transform: `translate(${translate})`}} className="headline-single">
            <Image 
                src={nextMatchStadium} 
                alt="stadium" 
                fill
                className="headline-single-img"
                priority
            />
            <div className="headline-game-info middle-container">
                {nextMatch}
            </div>
            <div className="headline-img-mask-left"></div>
            <div className="headline-img-mask-right"></div>
        </div>
    )
}

export default HeadlineNextMatch