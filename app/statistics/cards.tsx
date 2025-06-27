import React from 'react'
import { onFetch } from '@/lib/fetchApi'
import Config from '@/lib/config'
import { StatsPlayerType, QueryType } from '@/types/dataTypes'

function RenderCards({cards, type}: {cards: StatsPlayerType[], type: "yellow" | "red"}) {

    const cardsList = cards.map((c: StatsPlayerType) => {
        const cards = type === "yellow" ? c.yellow_cards : c.red_cards
        return (
            <div key={c.id} style={{display: "flex", gap: "10px"}}>
                <div>{c.name}</div>
                <div>{c.shirt_number}</div>
                 <div>{cards}</div>
            </div>
        )
    })

    return(
        <div>
            <div>{type} cards</div>
            {cardsList}
        </div>
    )
}

async function Cards() {

    const currentSeason = Config.availableSeasons[0]

    const statsCardsInitialQuery = {
        from_date: `${currentSeason}-01-01`,
        to_date: `${currentSeason}-12-31`,
        count: 100,
    }

    const query: QueryType = statsCardsInitialQuery

    // Team platform
    const teamPlatformId = Config.team
    if (teamPlatformId) query.team_id = teamPlatformId

    const statsCardsData = await onFetch("stats/top/cards", query)

    const cards = statsCardsData?.players || []

    const yellowCards = cards
        .filter((c: StatsPlayerType) => c.yellow_cards !== 0)
        .slice(0, 10)
    
    const redCards = cards
        .filter((c: StatsPlayerType) => c.red_cards !== 0)
        .slice(0, 10)

    return (
        <div>
            <div>Bookings</div>
            <br />
            <RenderCards cards={yellowCards} type="yellow" />
            <br />
            <RenderCards cards={redCards} type="red" />
        </div>
    )
}

export default Cards