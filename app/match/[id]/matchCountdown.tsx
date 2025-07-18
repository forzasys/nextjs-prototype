"use client"
import { useState, useEffect } from 'react'
import { GameType } from '@/types/dataTypes'
import { useCountDown } from '@/utilities/ClientSideUtils'

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
        <div>
            <div>MatchCountdown</div>
            <div>{days}d {hours}h {minutes}m {seconds}s</div>
        </div>
   )
}

export default MatchCountdown