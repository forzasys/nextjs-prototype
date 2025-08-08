import HeadlineClient from "./headlineClient"
import { GameType } from "@/types/dataTypes"
import "./headline.css"

interface HeadlinesProps {
    game: GameType
}

async function Headlines({game}: HeadlinesProps) {
    return (
        <HeadlineClient game={game} />
    )
}

export default Headlines
