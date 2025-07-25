import React from 'react'
import { onFetch } from '@/utilities/fetchApi'
import { PlayerType } from '@/types/dataTypes'

interface MatchLineupProps {
    gameId: string
    gameEvents: []
}

async function MatchLineup({ gameId, gameEvents }: MatchLineupProps) {

    const matchLineupData = await onFetch(`/game/${gameId}/players`)

    console.log(gameEvents)

    const homeTeamData = matchLineupData.home_team
    const awayTeamData = matchLineupData.visiting_team

    const homeLineup = (
        <div>
            <div>home team</div>
            <div>{homeTeamData.name}</div>
            <div>{homeTeamData.formation?.name}</div>
            <br />
            <div>
                {homeTeamData.players.map((p: PlayerType) => {
                    return (
                        <div key={p.id}>
                            {p.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )

    const awayLineup = (
        <div>
            <div>home team</div>
            <div>{awayTeamData.name}</div>
            <div>{awayTeamData.formation?.name}</div>
            <br />
            <div>
                {awayTeamData.players.map((p: PlayerType) => {
                    return (
                        <div key={p.id}>
                            {p.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )

    return (
        <div>
            <div style={{display: "flex", gap: "50px"}}>
                {homeLineup}
                {awayLineup}
            </div>
        </div>
    )
}

export default MatchLineup