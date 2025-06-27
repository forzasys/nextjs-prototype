import React from 'react'
import { QueryType, TableType } from '@/types/dataTypes'
import { onFetch } from '@/lib/fetchApi'
import Config from '@/lib/config'

async function Table() {

    const currentSeason = Config.availableSeasons[0]

    const topScorerInitialQuery = {
        season: currentSeason,
        to_date: `${currentSeason}-12-31`,
        count: 30,
    }

    const query: QueryType = topScorerInitialQuery

    const tableData = await onFetch("stats/table", query)
    const table = tableData?.teams || []
    
    const tableList = (
        <div>
            {table.map((t: TableType) => {
                return (
                    <div key={t.id} style={{display: "flex", gap: "7px"}}>
                        <div>{t.rank}</div>
                        <div style={{width: "175px"}}>{t.name}</div>
                        <div>{t.games_played}</div>  
                        <div>{t.wins}</div>
                        <div>{t.ties}</div>
                        <div>{t.losses}</div>
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