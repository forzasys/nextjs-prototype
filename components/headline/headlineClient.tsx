"use client"
import React, { useState, useEffect } from 'react'
import HeadlineNextMatch from './headlineNextMatch'
import HeadlineClubSite from './headlineClubSite'
// import HeadlineLatestGoal from './headlineLatestGoal'
import { GameType } from '@/types/dataTypes'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
// import { format, parseISO } from 'date-fns';
import { getLeagueLink } from '@/utilities/utils';
import config from '@/config';
import "./headline.css"

interface HeadlineClientProps {
    game: GameType
}

function HeadlineClient({game}: HeadlineClientProps) {

    const [index, setIndex] = useState(0)
    const [timing, setTiming] = useState(1)

    const t = useTranslations();

    useEffect(() => {
        const onSetTiming = setInterval(() => {
            setTiming(prev => prev + 0.25)
        }, 15)
        return () => clearInterval(onSetTiming)
    }, [])

    useEffect(() => {
        if (timing === 100) {
            setTiming(1)
            if (index === 1) setIndex(0)
            // else setIndex(index + 1)
        }
    }, [timing, index])

    const onSelectHeadline = (idx: number) => {
        setTiming(1)
        setIndex(idx)
    }

    const nextMatchHomeTeam = game.home_team.name
    const nextMatchAwayTeam = game.visiting_team.name
    const nextGameDate = game.date // keep server/client identical without timezone transforms
    const nextGameTime = game.start_time?.length >= 16 ? game.start_time.substring(11, 16) : ''

    const headlineTimeBar = {width: timing + "%"}
    // const headlinePosition = index === 0 ? "0%" : `${-index * 100}%`
    const leagueLink = getLeagueLink[config.league as keyof typeof getLeagueLink]

    const headlineItems = (
        <div className="headline-items middle-container">
            <div onClick={() => onSelectHeadline(0)} className={classNames("headline-item", {active: index === 0})}>
                <div className="headline-item-bar">
                    <div style={headlineTimeBar} className="headline-timing-bar"/>
                </div>
                <div className="headline-item-text">
                    <div className="headline-item-title">{t("next match")}</div>
                    <div className="headline-item-subtitle">
                        <div>{nextMatchHomeTeam} - {nextMatchAwayTeam}</div>
                        <div>{nextGameDate}, {nextGameTime}</div>
                    </div>
                </div>
            </div>
            <div onClick={() => onSelectHeadline(1)} className={classNames("headline-item", {active: index === 1})}>
                <div className="headline-item-bar">
                    <div style={headlineTimeBar} className="headline-timing-bar"/>
                </div>
                <div className="headline-item-text">
                    <div className="headline-item-title">{t("latest news")}</div>
                    <div className="headline-item-subtitle">
                        <div>Find out the latest news from the club</div>
                        <div>{leagueLink}</div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="headline-main">
            <div className="headline-container">
                <div className="headline-slider-container">
                    <HeadlineNextMatch show={index === 0} game={game} />
                    <HeadlineClubSite show={index === 1}/>
                </div>
                {headlineItems}
            </div>
        </div>
    )
}   

export default HeadlineClient