import React from 'react'
import { onFetch } from '@/utilities/fetchApi'
import config from '@/config';
import { QueryType, StatsPlayerType } from '@/types/dataTypes'

async function Assists() {

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

    const topAssistsData = await onFetch("stats/top/assists", query)
    const topAssists = topAssistsData?.players || []

    const topAssistsList = (
        <div>
            {topAssists.map((s: StatsPlayerType) => {
                return (
                    <div key={s.id} style={{display: "flex", gap: "7px"}}>
                        <div>{s.name}</div>
                        <div>{s.shirt_number}</div>
                        <div>{s.assists}</div>
                    </div>
                )
            })}
        </div>
    )

    return (
        <div>
            <div>Top Assists</div>
            <br />
            {topAssistsList}
        </div>
    )
}

export default Assists