import React from 'react'
import { GameType } from '@/types/dataTypes'
import Image from 'next/image'
import { format, parseISO } from 'date-fns';
import { getTranslations } from 'next-intl/server';
import { teamStadiumName } from '@/utilities/utils';
import './homePageHighlights.css'

interface HomePageHighlightsProps { 
    games: GameType[]
}

async function HomePageHighlights({games}: HomePageHighlightsProps) {

    const t = await getTranslations();

    const latestThreeGames = games
        .filter((game) => new Date(game.date) < new Date())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3)

    const latestHighlightsList = latestThreeGames.map((game) => {

        const {home_team, visiting_team} = game
        const gameDate = format(game.date, 'EEE, dd MMM yyyy');
        const gameTime = format(parseISO(game.start_time), 'HH:mm')
        const stadiumName = teamStadiumName[home_team.id as keyof typeof teamStadiumName]

        return (
            <div key={game.id} className="latest-highlights-single">
                <div className="latest-highlights-mask"></div>
                <div className="latest-highlights-content">
                    <div className="latest-highlights-date">
                        <span className="latest-highlights-date-day">{gameDate}</span>
                        <div className='latest-highlights-date-time'>{gameTime}</div>
                    </div>
                    <div className="latest-highlights-info">
                        <div className="latest-highlights-team">
                            <Image src={home_team.logo_url} alt={home_team.name} fill priority />
                        </div>
                        <div className="latest-highlights-score">
                            <div className="latest-highlights-score-home">{game.home_team_goals}</div>
                            <div className="latest-highlights-score-separator">-</div>
                            <div className="latest-highlights-score-away">{game.visiting_team_goals}</div>
                        </div>
                        <div className="latest-highlights-team">
                            <Image src={visiting_team.logo_url} alt={visiting_team.name} fill priority />
                        </div>
                    </div>
                    <div className="latest-highlights-venue">{stadiumName}</div>
                </div>
            </div>
        )
    })

    return (
        <div className="home-page-highlights-cont middle-container">
            <div className="section-title">{t("latest results")}</div>
            <div className="latest-highlights-list">
                {latestHighlightsList}
            </div>
        </div>
    )
}

export default HomePageHighlights