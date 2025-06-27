import React from 'react'
import { onFetch } from '@/lib/fetchApi'
import Config from '@/lib/config'
import { QueryType, TopScorerType } from '@/types/dataTypes'

async function HomeTopScorer() {

    const currentSeason = Config.availableSeasons[0]

    const topScorerInitialQuery = {
        from_date: `${currentSeason}-01-01`,
        to_date: `${currentSeason}-12-31`,
    }

    const query: QueryType = topScorerInitialQuery

    // Team platform
    const teamPlatformId = Config.team
    if (teamPlatformId) query.team_id = teamPlatformId

    const topScorersData = await onFetch("stats/top/scorer", query)
    const topScorers = topScorersData?.players || []

    const topScorersList = (
        <div>
            {topScorers.map((s: TopScorerType) => {
                return (
                    <div key={s.id} style={{display: "flex", gap: "7px"}}>
                        <div>{s.name}</div>
                        <div>{s.shirt_number}</div>
                        <div>{s.goals}</div>
                    </div>
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

export default HomeTopScorer