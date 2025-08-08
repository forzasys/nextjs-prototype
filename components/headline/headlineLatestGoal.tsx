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
            <Image 
                src={latestGoal.thumbnail_url} 
                alt="latest goal" 
                fill
                className="headline-single-img"
                sizes="()"
            />
            <div className="headline-single-content">
                {latestGoal.description}
            </div>
            <div className="headline-img-mask-left"></div>
            <div className="headline-img-mask-right"></div>
        </div>
    )
}

export default HeadlineLatestGoal