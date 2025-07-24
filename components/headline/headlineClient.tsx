"use client"
import React, { useState, useEffect } from 'react'
import HeadlineNextMatch from './headlineNextMatch'
import HeadlineClubSite from './headlineClubSite'
// import HeadlineLatestGoal from './headlineLatestGoal'
import { GameType, PlaylistType } from '@/types/dataTypes'
import classNames from 'classnames'

interface HeadlineClientProps {
    game: GameType
    latestGoal: PlaylistType
}

function HeadlineClient({game, latestGoal}: HeadlineClientProps) {

    const [index, setIndex] = useState(0)
    const [timing, setTiming] = useState(1)

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

    const headlineTimeBar = {width: timing + "%"}
    // const headlinePosition = index === 0 ? "0%" : `${-index * 100}%`

    const headlineItems = (
        <div className="headline-items middle-container">
            <div onClick={() => onSelectHeadline(0)} className={classNames("headline-item", {active: index === 0})}>
                <div className="headline-item-bar">
                    <div style={headlineTimeBar} className="headline-timing-bar"/>
                </div>
                <div className="headline-item-text">
                    <div>Next match</div>
                    <div>Vålerenga IF - FK Haugesund</div>
                    <div>20.07.2025 14:30</div>
                </div>
            </div>
            <div onClick={() => onSelectHeadline(1)} className={classNames("headline-item", {active: index === 1})}>
                <div className="headline-item-bar">
                    <div style={headlineTimeBar} className="headline-timing-bar"/>
                </div>
                <div className="headline-item-text">
                    <div>Latest news</div>
                    <div>Find out the latest news from the club</div>
                    <div>Visit www.vif-fotball.no</div>
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
                    {/* <HeadlineLatestGoal translate={translate} latestGoal={latestGoal} /> */}
                    {/* <div className="headline-img-mask-right"></div> */}
                    {/* <div className="headline-img-mask-left"></div> */}
                </div>
                {headlineItems}
            </div>
        </div>
    )
}   

export default HeadlineClient