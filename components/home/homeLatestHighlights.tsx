import React from 'react'
import Image from 'next/image'
import { GameType } from '@/types/dataTypes'
import { format } from 'date-fns'
import { getTeamBaseColor } from '@/utilities/utils'
import { getTranslations } from 'next-intl/server'
import "./homeLatestHighlights.css"

interface HomeLatestHighlightsProps {
    games: GameType[]
}

async function HomeLatestHighlights({games}: HomeLatestHighlightsProps) {

    const t = await getTranslations();

    const latestGames = games
        .filter((game) => new Date(game.date) < new Date())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4)

    console.log(latestGames)

    const latestHighlightsList = latestGames.map((game) => {
        const {home_team, visiting_team} = game
        const homeTeamColor = getTeamBaseColor[game.home_team.id as keyof typeof getTeamBaseColor]
        const awayTeamColor = getTeamBaseColor[game.visiting_team.id as keyof typeof getTeamBaseColor]
        const gameDate = format(game.date, 'EEE, dd MMM yyyy');
        return (
            <div key={game.id} className="latest-single">
                <div className="latest-single-box">
                    <div style={{backgroundColor: homeTeamColor}} className="latest-single-bg">
                        <div style={{backgroundColor: awayTeamColor}} className="latest-highlights-away-bg"></div>
                    </div>                
                    <div className="latest-single-team">
                        <div className="latest-single-team-logo">
                            <Image src={game.home_team.logo_url} alt={game.home_team.name} width={65} height={65} />
                        </div>
                        <div className="latest-single-team-logo">
                            <Image src={game.visiting_team.logo_url} alt={game.visiting_team.name} width={65} height={65} />
                        </div>
                    </div>
                </div>
                <div className="latest-single-info">
                    <div className="latest-single-info-title">Highlights</div>
                    <div className="latest-single-info-date">{gameDate}</div>
                    <div className="latest-single-info-match">
                        <div>{home_team.name} {game.home_team_goals} - {game.visiting_team_goals} {visiting_team.name}</div>
                    </div>
                </div>
            </div>
        )
    })

  return (
    <div className="home-latest-highlights-cont">
        <div className="middle-container">
            <div className="home-latest-highlights-title">{t("latest results")}</div>
            <div className="latest-highlights-list">
                {latestHighlightsList}
            </div>
        </div>
    </div>  
  )
}

export default HomeLatestHighlights