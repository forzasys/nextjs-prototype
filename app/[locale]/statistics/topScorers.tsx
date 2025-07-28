import React from 'react'
import { onFetch } from '@/utilities/fetchApi'
import config from '@/config';
import { QueryType, StatsPlayerType } from '@/types/dataTypes'
import Link from 'next/link'
import { useLocale } from 'next-intl';

interface TopScorersProps {
    seasonParam: string | null
}

async function TopScorers({seasonParam}: TopScorersProps) {

    const locale = useLocale();
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
    const topAssistsData = await onFetch("stats/top/assists", query)

    const topScorers = topScorersData?.players || []
    const topAssists = topAssistsData?.players || []

    const topScorersList = (
        <div>
            {topScorers.map((s: StatsPlayerType) => {

                let playerLinkToVideos = `/${locale}/videos?event=goal&player=${s.id}`
                if (!teamPlatformId) playerLinkToVideos += `&team=${teamPlatformId}`
                if (seasonParam) playerLinkToVideos += `&season=${seasonParam}`

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

    const topAssistsList = (
        <div>
            {topAssists.map((s: StatsPlayerType) => {
                let playerLinkToVideos = `/${locale}/videos?event=assist&player=${s.id}`
                if (!teamPlatformId) playerLinkToVideos += `&team=${teamPlatformId}`
                return (
                    <Link key={s.id} href={playerLinkToVideos} style={{display: "flex", gap: "7px"}}>
                        <div>{s.name}</div>
                        <div>{s.shirt_number}</div>
                        <div>{s.assists}</div>
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
            <br />
            <div>TopAssists</div>
            <br />
            {topAssistsList}
        </div>
    )
}

export default TopScorers