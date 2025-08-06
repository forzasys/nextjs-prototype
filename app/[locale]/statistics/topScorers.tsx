import React from 'react'
import config from '@/config';
import { StatsPlayerType } from '@/types/dataTypes'
import Link from 'next/link'
import { getLocale } from 'next-intl/server';

interface TopScorersProps {
    seasonParam: string | null
    topScorers: StatsPlayerType[]
    topAssists: StatsPlayerType[]
}

async function TopScorers({seasonParam, topScorers, topAssists}: TopScorersProps) {

    const locale = await getLocale();
    const teamPlatformId = config.team

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