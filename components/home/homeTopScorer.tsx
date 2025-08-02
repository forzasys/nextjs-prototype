"use client"
import React from 'react'
import config from '@/config';
import Link from 'next/link'
import { StatsPlayerType } from '@/types/dataTypes'
import { useLocale } from 'next-intl';

interface HomeTopScorerProps {
    topScorers: StatsPlayerType[]
}

function HomeTopScorer({topScorers}: HomeTopScorerProps) {

    const locale = useLocale();
    const currentSeason = config.availableSeasons[0]

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
            {topScorersList}
        </div>
    )
}

export default HomeTopScorer