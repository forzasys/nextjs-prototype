"use client"
import Image from "next/image"
import { PlaylistType } from "@/types/dataTypes"

interface HeadlineLatestGoalProps {
    translate: string
    latestGoal: PlaylistType
}

function HeadlineLatestGoal({translate, latestGoal}: HeadlineLatestGoalProps) {

    return (
        <div style={{transform: `translate(${translate})`}} className="headline-single">
            <div>Latest goal</div>
            <div>
                <Image src={latestGoal.thumbnail_url} alt="latest goal" width={200} height={120} />
            </div>
            <div>
                {latestGoal.description}
            </div>
        </div>
    )
}

export default HeadlineLatestGoal