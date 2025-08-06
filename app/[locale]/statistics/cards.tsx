import React from 'react'
import config from '@/config';
import { StatsPlayerType } from '@/types/dataTypes'
import Link from 'next/link'
import { useLocale } from 'next-intl';

interface RenderCardsProps {
    cards: StatsPlayerType[]
    type: "yellow" | "red"
    seasonParam: string | null
}

function RenderCards({cards, type, seasonParam}: RenderCardsProps) {

    const locale = useLocale();
    const teamPlatformId = config.team

    const cardsList = cards.map((c: StatsPlayerType) => {

        const cards = type === "yellow" ? c.yellow_cards : c.red_cards        
        let playerLinkToVideos = `videos?event=${cards} card&player=${c.id}`
        if (!teamPlatformId) playerLinkToVideos += `&team=${teamPlatformId}`
        if (seasonParam) playerLinkToVideos += `&season=${seasonParam}`

        return (
            <Link key={c.id} href={`/${locale}/${playerLinkToVideos}`} style={{display: "flex", gap: "10px"}}>
                <div>{c.name}</div>
                <div>{c.shirt_number}</div>
                 <div>{cards}</div>
            </Link>
        )
    })

    return(
        <div>
            <div>{type} cards</div>
            {cardsList}
        </div>
    )
}

interface CardsProps {
    seasonParam: string | null
    cards: StatsPlayerType[]
}

async function Cards({seasonParam, cards}: CardsProps) {

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
            <RenderCards cards={yellowCards} seasonParam={seasonParam} type="yellow" />
            <br />
            <RenderCards cards={redCards} seasonParam={seasonParam} type="red" />
        </div>
    )
}

export default Cards