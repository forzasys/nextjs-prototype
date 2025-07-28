import React from 'react'
import { onFetch } from '@/utilities/fetchApi'

interface MatchStatsProps { 
    gameId: string
}

async function MatchStats({ gameId } : MatchStatsProps) {

    const matchStatsData = await onFetch(`/game/${gameId}/stats`)
    const statistics = matchStatsData.statistics

    const {corners, goals, offsides, red_cards, shots_on_target, total_shots, yellow_cards, possessions, distances} = statistics
    
    return (
        <div className="">
            <div className="statistic-cont">
                <div style={{display: "flex", gap: "10px"}}>
                    <div className="statistic-value">{goals.home_team}</div>
                    <div className="statistic-title">
                        Goal
                    </div>
                    <div className="statistic-value">{goals.visiting_team}</div>
                </div>
                {/* <div style={{display: "flex", gap: "10px"}}>
                    <div className="statistic-value">
                        {showPossession(possessions.home_team["1st_half"], start_of_1st_half)}
                    </div>
                    <div className="statistic-title">
                        <FormattedMessage id="statistic.possession" defaultMessage="Possession" /> 1:A %
                    </div>
                    <div className="statistic-value">
                        {showPossession(possessions.visiting_team["1st_half"], start_of_1st_half)}
                    </div>
                </div>
                <div className="statistic-single">
                    <div className="statistic-value">
                        {showPossession(possessions.home_team["2nd_half"], start_of_2nd_half)}
                    </div>
                    <div className="statistic-title">
                        <FormattedMessage id="statistic.possession" defaultMessage="Possession" /> 2:A %
                    </div>
                    <div className="statistic-value">
                        {showPossession(possessions.visiting_team["2nd_half"], start_of_2nd_half)}
                    </div>
                </div>
                <div className="statistic-single">
                    <div className="statistic-value">
                        {showPossession(possessions.home_team.game, start_of_1st_half)}
                    </div>
                    <div className="statistic-title">
                        <FormattedMessage id="statistic.possession" defaultMessage="Possession" /> %
                    </div>
                    <div className="statistic-value">
                        {showPossession(possessions.visiting_team.game, start_of_1st_half)}
                    </div>
                </div> */}
                {distances && (
                    <div style={{display: "flex", gap: "10px"}}>
                        <div className="statistic-value">{distances.home_team?.game?.toLocaleString()}</div>
                        <div className="statistic-title">
                            Distance
                        </div>
                        <div className="statistic-value">{distances.visiting_team?.game?.toLocaleString()}</div>
                    </div>
                )}
                <div style={{display: "flex", gap: "10px"}}>
                    <div className="statistic-value">{total_shots.home_team}</div>
                    <div className="statistic-title">
                        Shot
                    </div>
                    <div className="statistic-value">{total_shots.visiting_team}</div>
                </div>
                <div style={{display: "flex", gap: "10px"}}>
                    <div className="statistic-value">{shots_on_target.home_team}</div>
                    <div className="statistic-title">
                        Shot on target
                    </div>
                    <div className="statistic-value">{shots_on_target.visiting_team}</div>
                </div>
                <div style={{display: "flex", gap: "10px"}}>
                    <div className="statistic-value">{corners.home_team}</div>
                    <div className="statistic-title">
                        Corner
                    </div>
                    <div className="statistic-value">{corners.visiting_team}</div>
                </div>
                <div style={{display: "flex", gap: "10px"}}>
                    <div className="statistic-value">{offsides.home_team}</div>
                    <div className="statistic-title">
                        Offside
                    </div>
                    <div className="statistic-value">{offsides.visiting_team}</div>
                </div>
                <div style={{display: "flex", gap: "10px"}}>
                    <div className="statistic-value">{yellow_cards.home_team}</div>
                    <div className="statistic-title">
                        Yellow card
                    </div>
                    <div className="statistic-value">{yellow_cards.visiting_team}</div>
                </div>
                <div style={{display: "flex", gap: "10px"}}>
                    <div className="statistic-value">{red_cards.home_team}</div>
                    <div className="statistic-title">
                        Red card
                    </div>
                    <div className="statistic-value">{red_cards.visiting_team}</div>
                </div>
            </div>
        </div>
    )
}

export default MatchStats