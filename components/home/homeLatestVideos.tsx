import { onFetch } from "@/utilities/fetchApi";
import { videoCollectionQueries } from "@/utilities/queryUtils";
import Image from "next/image";
import { PlaylistType } from "@/types/dataTypes";
import Link from "next/link";
import { formatReadableDate } from "@/utilities/utils";
import classNames from "classnames";
import "./home.css"

async function HomeLatestVideos() {

    const goalCollectionQuery = videoCollectionQueries({collectionName: "goal"})
    goalCollectionQuery.count = 9

    const highlightCollectionQuery = videoCollectionQueries({collectionName: "highlights"})
    highlightCollectionQuery.count = 9

    const latestGoalsData = await onFetch("playlist", goalCollectionQuery)
    const latestGoals = latestGoalsData?.playlists || []

    const latestGoalsList = (
        <div className="latest-videos-list">
            {latestGoals.map((video: PlaylistType, index: number) => {
                const shortBox = [1,3,6,7].includes(index)
                return (
                    <Link href={`/video/${video.id}`} key={video.id} className={classNames("latest-video-single", {
                        "short-box": shortBox
                    })}>
                        <div className="latest-video-img-container">
                            <Image 
                                src={video.thumbnail_url}
                                alt={video.description || "Video thumbnail"}
                                fill
                                className="latest-video-img"
                                priority
                            />
                        </div>
                        <div className="latest-video-type">Event</div>
                        <div className="latest-video-item-title">{video.description}</div>
                        <div className="latest-video-item-date">{formatReadableDate(video.date)}</div>
                    </Link>
                )
            })}
        </div>
    )

    return (
        <div className="">
           <div className="latest-videos-container middle-container">
                <div className="section-title">Latest videos</div>
                {latestGoalsList}
           </div>
        </div>
    )
}

export default HomeLatestVideos