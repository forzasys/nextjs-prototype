import React from 'react'
import { TableType, TeamType } from '@/types/dataTypes'
import { onFetch } from '@/utilities/fetchApi'
import config from '@/config';
import Image from 'next/image';
import { getLeagueLogo } from '@/utilities/imageUtil';
import "./statistics.css"

async function Table() {

    const currentSeason = config.availableSeasons[0]
    const league = config.league
    const leagueLogo = getLeagueLogo[league as string]

    const tableInitialQuery = {
        season: currentSeason,
        to_date: `${currentSeason}-12-31`,
    }

    const teamsData = await onFetch("team", {season: currentSeason})
    const tableData = await onFetch("stats/table", tableInitialQuery)
    const table = tableData?.teams || []

    const getTeamLogo = (teamId: number) => {
        const team = teamsData?.teams.find((t: TeamType) => t.id === teamId)
        return team?.logo_url
    }

    console.log(table)

    const tableList = (
        <div className="table-cont">
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
                            <Image src={getTeamLogo(t.id)} alt={t.name} width={50} height={50} />
                            {t.name}
                        </div>
                        <div className="table-statistic">{t.games_played}</div>  
                        <div className="table-statistic">{t.wins}</div>
                        <div className="table-statistic">{t.ties}</div>
                        <div className="table-statistic">{t.losses}</div>
                        <div className="table-statistic">{t.goals}</div>
                        <div className="table-statistic">{t.goals_conceded}</div>
                        <div className="table-statistic">{t.goal_difference}</div>
                        <div className="table-statistic">{t.points}</div>
                    </div>
                )
            })}
        </div>
    )

    return (
        <div className="league-table">
            <div className="league-table-logo">
                <Image src={leagueLogo} alt="League logo" width={120} height={60} />
            </div>
            {tableList}
        </div>
    )
}

export default Table