import Stat from './Stat'
import { StatisticsType, TeamType } from '@/types/dataTypes'
import config from '@/config'
import './matchStats.css'

interface MatchStatsProps { 
    homeTeam: TeamType
    awayTeam: TeamType
    statistics: StatisticsType | null
}

async function MatchStats({ homeTeam, awayTeam, statistics } : MatchStatsProps) {

    const teamPlatform = config.team

    let side = "none"

    if (!!teamPlatform) {
        if (homeTeam.id === teamPlatform) {
            side = "home"
        }
        if (awayTeam.id === teamPlatform) {
            side = "away"
        }
    }

    if (!statistics) return null

    const {corners, distances, fouls_committed, goals, offsides, possessions, red_cards, shots_on_target, total_shots, yellow_cards} = statistics
    
    return (
        <div className="statistic-cont">
            <Stat title="Goals" homeStat={goals.home_team} awayStat={goals.visiting_team} side={side} />
            <Stat title="Shots" homeStat={total_shots.home_team} awayStat={total_shots.visiting_team} side={side} />
            <Stat title="Shots on target" homeStat={shots_on_target.home_team} awayStat={shots_on_target.visiting_team} side={side} />
            <Stat title="Fouls committed" homeStat={fouls_committed.home_team} awayStat={fouls_committed.visiting_team} side={side} />
            <Stat title="Yellow cards" homeStat={yellow_cards.home_team} awayStat={yellow_cards.visiting_team} side={side} />
            <Stat title="Red cards" homeStat={red_cards.home_team} awayStat={red_cards.visiting_team} side={side} />
            <Stat title="Corners" homeStat={corners.home_team} awayStat={corners.visiting_team} side={side} />
            <Stat title="Offsides" homeStat={offsides.home_team} awayStat={offsides.visiting_team} side={side} />
        </div>
    )
}

export default MatchStats