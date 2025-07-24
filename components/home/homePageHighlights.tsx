import React from 'react'
import { GameType } from '@/types/dataTypes'
import Image from 'next/image'
import { format, parseISO } from 'date-fns';
import { getStadiumImage } from '@/utilities/imageUtil';

interface HomePageHighlightsProps { 
    games: GameType[]
}

function HomePageHighlights({games}: HomePageHighlightsProps) {

    const latestThreeGames = games
        .filter((game) => new Date(game.date) < new Date())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3)

    const latestHighlightsList = latestThreeGames.map((game) => {

        const {home_team, visiting_team} = game
        const gameDate = format(game.date, 'EEE, dd MMM yyyy');
        const gameTime = format(parseISO(game.start_time), 'HH:mm')
        const stadiumImage = getStadiumImage[home_team.id]

        return (
            <div key={game.id} className="latest-highlights-single">
                {stadiumImage && (
                    <div className="latest-highlights-single-img-cont">
                        <Image 
                            src={stadiumImage} 
                            alt="intility arena" 
                            fill
                            className="latest-highlights-single-img"
                        />
                    </div>
                )}
                <div className="latest-highlights-single-mask"></div>
                <div className="latest-highlights-single-content">
                    <div className="latest-highlights-date">
                        <span className="latest-highlights-date-day">{gameDate}</span>
                        <div className='latest-highlights-date-time'>{gameTime}</div>
                        {/* <span className="latest-highlights-date-time">Intility Arena</span> */}
                    </div>
                    <div className="latest-highlights-score">
                        <div className="latest-highlights-team">
                            <Image src={home_team.logo_url} alt={home_team.name} width={60} height={60} />
                            {/* <div className="latest-highlights-team-name">
                                {home_team.name}
                            </div> */}
                        </div>
                        {/* <div className="latest-highlights-team-score">{gameTime}</div> */}
                        <div className="latest-highlights-team">
                            <Image src={visiting_team.logo_url} alt={visiting_team.name} width={60} height={60} />
                            {/* <div className="latest-highlights-team-name">
                                {visiting_team.name}
                            </div>   */}
                        </div>
                    </div>
                    <div className='latest-highlights-venue'>Intility Arena</div>
                </div>
            </div>
        )
    })

    return (
        <div className="home-page-highlights-cont middle-container">
            {/* <div className="home-page-matches-title">Latest <br />Highlights</div> */}
            <div className="latest-highlights-list">
                {latestHighlightsList}
            </div>
        </div>
    )
}

export default HomePageHighlights