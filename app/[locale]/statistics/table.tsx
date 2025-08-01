"use client"
import React, { useEffect } from 'react'
import { TableType, TeamType } from '@/types/dataTypes'
import config from '@/config';
import Image from 'next/image';
import { getLeagueLogo } from '@/utilities/imageUtil';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./statistics.css"

interface TableProps {
    table: TableType[]
    teams: TeamType[]
    seasonParam: string | null
}

function Table({table, teams, seasonParam}: TableProps) {

    useEffect(() => {
        AOS.init({
          offset: 100,
          once: true,
          easing: 'ease-in-out',
        });
    }, []);

    const leagueLogo = getLeagueLogo[config.league as string]

    const getTeamLogo = (teamId: number) => {
        const team = teams.find((t: TeamType) => t.id === teamId)
        return team?.logo_url || ""
    }

    const tableList = (
        <div className="table-cont" data-aos="fade-up">
            <div className="table-header">
                <div className="table-statistic position">Pos</div>
                <div className="table-statistic team">Team</div>
                <div className="table-statistic">P</div>  
                <div className="table-statistic">W</div>
                <div className="table-statistic">D</div>
                <div className="table-statistic">L</div>
                <div className="table-statistic">GS</div>
                <div className="table-statistic">GC</div>
                <div className="table-statistic">GD</div>
                <div className="table-statistic">PTS</div>
            </div>
            {table.map((t: TableType) => {
                return (
                    <div key={t.id} className="table-item">
                        <div className="table-position">{t.rank}</div>
                        <div className="table-statistic team item">
                            <Image src={getTeamLogo(t.id)} alt={t.name} width={45} height={45} />
                            {t.name}
                        </div>
                        <div className="table-statistic">{t.games_played}</div>  
                        <div className="table-statistic">{t.wins}</div>
                        <div className="table-statistic">{t.ties}</div>
                        <div className="table-statistic">{t.losses}</div>
                        <div className="table-statistic">{t.goals}</div>
                        <div className="table-statistic">{t.goals_conceded}</div>
                        <div className="table-statistic">{t.goal_difference}</div>
                        <div className="table-statistic points">{t.points}</div>
                    </div>
                )
            })}
        </div>
    )

    return (
        <div className="league-table">
            <div className="league-table-logo">
                <Image src={leagueLogo} alt="League logo" width={100} height={50} />
            </div>
            {tableList}
        </div>
    )
}

export default Table