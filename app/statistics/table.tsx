import React from 'react'
import { TableType } from '@/types/dataTypes'
import { onFetch } from '@/utilities/fetchApi'
import config from '@/config';

async function Table() {

    const currentSeason = config.availableSeasons[0]

    const tableInitialQuery = {
        season: currentSeason,
        to_date: `${currentSeason}-12-31`,
    }

    const tableData = await onFetch("stats/table", tableInitialQuery)
    const table = tableData?.teams || []

    const tableList = (
        <div>
            <div style={{display: "flex", gap: "7px"}}>
                <div>Rank</div>
                <div style={{width: "175px"}}>Team</div>
                <div>Played</div>  
                <div>Wins</div>
                <div>Ties</div>
                <div>Losses</div>
                <div>GS</div>
                <div>GC</div>
                <div>GD</div>
                <div>Points</div>
            </div>
            {table.map((t: TableType) => {
                return (
                    <div key={t.id} style={{display: "flex", gap: "7px"}}>
                        <div>{t.rank}</div>
                        <div style={{width: "175px"}}>{t.name}</div>
                        <div>{t.games_played}</div>  
                        <div>{t.wins}</div>
                        <div>{t.ties}</div>
                        <div>{t.losses}</div>
                        <div>{t.goals_scored}</div>
                        <div>{t.goals_conceded}</div>
                        <div>{t.goal_difference}</div>
                        <div>{t.points}</div>
                    </div>
                )
            })}
        </div>
    )

    return (
        <div>
            <div>Table</div>
            <br />
            {tableList}
        </div>
    )
}

export default Table