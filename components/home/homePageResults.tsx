"use client"
import React from 'react'
import { GameType } from '@/types/dataTypes'
import Image from 'next/image'
import config from '@/config'
import Link from 'next/link';
import { format } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { RiArrowRightDoubleLine } from "react-icons/ri";
import './homePageResults.css'

interface HomePageHighlightsProps { 
    games: GameType[]
}

function HomePageHighlights({games}: HomePageHighlightsProps) {

    const t = useTranslations();
    const locale = useLocale();
    const moreResultsUrl = `/${locale}/${t("matches")}?match_type=results`;

    const latestGames = games
        .filter((game) => new Date(game.start_time).getTime() < new Date().getTime())
        .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
        .slice(0, 4)

    const latestHighlightsList = latestGames.map((game, index) => {

        const {home_team, visiting_team} = game
        const gameDate = format(game.date, 'EEE, dd MMM yyyy');
        return (
            <div key={game.id} data-aos="fade-up" data-aos-delay={index * 100} className="latest-result-single aos-init">
                <div className="latest-result-header">
                    {/* <div className="latest-result-venue">{stadiumName}</div> */}
                    <div className="latest-result-league">{config.league}</div>
                    <span className="latest-result-date">{gameDate}</span>
                </div>
                <div className="latest-result-content">
                    <div className='latest-result-team'>
                        <div className='latest-result-team-logo'>
                            <Image src={home_team.logo_url} alt="team logo" fill priority />
                        </div>
                        <div className='latest-result-team-name'>{home_team.name}</div>
                    </div>
                    <div className='latest-result-score'>
                        <div className='latest-result-score-number'>{game.home_team_goals}</div>
                        <span className='latest-result-score-separator'>-</span>
                        <div className='latest-result-score-number'>{game.visiting_team_goals}</div>
                    </div>
                    <div className='latest-result-team'>
                        <div className='latest-result-team-logo'>
                            <Image src={visiting_team.logo_url} alt="team logo" fill priority />
                        </div>
                        <div className='latest-result-team-name'>{visiting_team.name}</div>
                    </div>
                </div>
                <Link href={`/${locale}/match/${game.id}`} className="match-center-button">
                    {t("match report")}
                </Link>
            </div>
        )
    })

    return (
        <div className="home-page-results-cont">
            <div className="home-page-results middle-container">
                <div className="section-header opposite">
                    <div className="section-title">
                        {t("latest results")}
                        <div className="section-title-mask"></div>
                    </div>
                    <Link href={moreResultsUrl} className="section-more">
                        {t("more results")}
                        <RiArrowRightDoubleLine />
                    </Link>
                </div>
                <div className="latest-results-list">
                    {latestHighlightsList}
                </div>
            </div>
        </div>
    )
}

export default HomePageHighlights