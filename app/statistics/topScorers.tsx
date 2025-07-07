import React from 'react'
import { onFetch } from '@/utilities/fetchApi'
import config from '@/config';
import { QueryType, StatsPlayerType } from '@/types/dataTypes'
import Link from 'next/link'

async function TopScorers() {

    const currentSeason = config.availableSeasons[0]

    const topScorerInitialQuery = {
        from_date: `${currentSeason}-01-01`,
        to_date: `${currentSeason}-12-31`,
        count: 10,
    }

    const query: QueryType = topScorerInitialQuery

    // Team platform
    const teamPlatformId = config.team
    if (teamPlatformId) query.team_id = teamPlatformId

    const topScorersData = await onFetch("stats/top/scorer", query)
    const topScorers = topScorersData?.players || []
    
    const topScorersList = (
        <div>
            {topScorers.map((s: StatsPlayerType) => {
                const playerLinkToVideos = `videos?tag=goal&team=${s.team_id}&player=${s.id}&season=${currentSeason}`
                return (
                    <Link key={s.id} href={playerLinkToVideos} style={{display: "flex", gap: "7px"}}>
                        <div>{s.shirt_number}</div>
                        <div>{s.name}</div>
                        <div>{s.goals}</div>
                    </Link>
                )
            })}
        </div>
    )

    return (
        <div>
            <div>TopScorers</div>
            <br />
            {topScorersList}
        </div>
    )
}

export default TopScorers