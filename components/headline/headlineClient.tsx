"use client"
import React, { useState, useEffect } from 'react'
import HeadlineNextMatch from './headlineNextMatch'
import HeadlineLatestGoal from './headlineLatestGoal'
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
            else setIndex(index + 1)
        }
    }, [timing, index])

    const onSelectHeadline = (idx: number) => {
        setTiming(1)
        setIndex(idx)
    }

    const timingStyle = {width: timing + "%"}

    // console.log(timingStyle)

    const translate = index === 0 ? "0%" : `${-index * 100}%`

    // console.log(translate)

    return (
        <div className="headline-container">
            <div className="middle-container">
                <div className="headline-slider-container">
                    <HeadlineNextMatch translate={translate} game={game} />
                    <HeadlineLatestGoal translate={translate} latestGoal={latestGoal} />
                </div>
                <div className="headline-items">
                    <div onClick={() => onSelectHeadline(0)} className={classNames("headline-item", {active: index === 0})}>
                        <div>Next match</div>
                        <div className="headline-item-bar">
                            <div style={timingStyle} className="headline-timing-bar"/>
                        </div>
                    </div>
                    <div onClick={() => onSelectHeadline(1)} className={classNames("headline-item", {active: index === 1})}>
                        <div>Latest goal</div>
                        <div className="headline-item-bar">
                            <div style={timingStyle} className="headline-timing-bar"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default HeadlineClient