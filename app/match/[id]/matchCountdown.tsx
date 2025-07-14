"use client"
import React from 'react'
import { GameType } from '@/types/dataTypes'
import { useCountDown } from '@/utilities/ClientSideUtils'

interface MatchCountdownProps {
    game: GameType
}

function MatchCountdown({game}: MatchCountdownProps) {

    const countdown = useCountDown(game.start_time)

    if (!countdown) return null

    const {days, hours, minutes, seconds} = countdown

    return (
        <div>
            <div>MatchCountdown</div>
            <div>{days}d {hours}h {minutes}m {seconds}s</div>
        </div>
   )
}

export default MatchCountdown