"use client"
import { useState, useEffect } from 'react'
import { GameType } from '@/types/dataTypes'
import { useCountDown } from '@/utilities/ClientSideUtils'
import './matchCountdown.css'

interface MatchCountdownProps {
    game: GameType
}

function MatchCountdown({game}: MatchCountdownProps) {

    const [isMounted, setIsMounted] = useState(false)
    const countdown = useCountDown(game.start_time)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    const {days, hours, minutes, seconds} = countdown

    return (
        <div className='match-countdown-main'>
            <div className='match-countdown-title'>Match starts in</div>
            <div className='match-countdown-timer'>
                <div className='match-countdown-time-single'>
                    <div className='match-countdown-time-number'>{days}</div>
                    <div className='match-countdown-time-label'>days</div>
                </div>
                <div className='match-countdown-time-separator'>:</div>
                <div className='match-countdown-time-single'>
                    <div className='match-countdown-time-number'>{hours}</div>
                    <div className='match-countdown-time-label'>hours</div>
                </div>
                <div className='match-countdown-time-separator'>:</div>
                <div className='match-countdown-time-single'>
                    <div className='match-countdown-time-number'>{minutes}</div>
                    <div className='match-countdown-time-label'>mins</div>
                </div>
                <div className='match-countdown-time-separator'>:</div>
                <div className='match-countdown-time-single'>
                    <div className='match-countdown-time-number'>{seconds}</div>
                    <div className='match-countdown-time-label'>secs</div>
                </div>
            </div>
        </div>
   )
}

export default MatchCountdown