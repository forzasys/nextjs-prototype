import HeadlineClient from "./headlineClient"
import { GameType } from "@/types/dataTypes"
import { onFetch } from "@/utilities/fetchApi"
import config from "@/config"
import "./headline.css"

interface HeadlinesProps {
    game: GameType
}

async function Headlines({game}: HeadlinesProps) {
                                                                
    const latestGoalQuery = {
        tags: [{ action: "goal" }],
        filters: ["official"],
        count: 1,
    }

    const teamPlatformId = config.team
    const isTeamPlatform = !!teamPlatformId
    if (isTeamPlatform) {
        latestGoalQuery.tags = latestGoalQuery?.tags?.map(tag => ({
          ...tag,
          team: { id: teamPlatformId }
        }));
    }

    const latestGoalData = await onFetch("playlist", latestGoalQuery)
    const latestGoal = latestGoalData?.playlists[0] || []

    return (
        <HeadlineClient game={game} latestGoal={latestGoal} />
    )
}

export default Headlines
