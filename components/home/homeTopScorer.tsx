import React from 'react'
import { onFetch } from '@/utilities/fetchApi'
import config from '@/config';
import Link from 'next/link'
import { QueryType, StatsPlayerType } from '@/types/dataTypes'
import { useLocale } from 'next-intl';

async function HomeTopScorer() {

    const locale = useLocale();
    const currentSeason = config.availableSeasons[0]

    const topScorerInitialQuery = {
        from_date: `${currentSeason}-01-01`,
        to_date: `${currentSeason}-12-31`,
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
                const playerLinkToVideos = `/${locale}/videos?tag=goal&team=${s.team_id}&player=${s.id}&season=${currentSeason}`
                return (
                    <Link key={s.id} href={playerLinkToVideos} style={{display: "flex", gap: "7px"}}>
                        <div>{s.name}</div>
                        <div>{s.shirt_number}</div>
                        <div>{s.goals}</div>
                    </Link>
                )
            })}
        </div>
    )

    return (
        <div className='middle-container'>
            <div>TopScorers</div>
            <br />
            {topScorersList}
        </div>
    )
}

export default HomeTopScorer