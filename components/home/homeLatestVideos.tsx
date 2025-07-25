"use client"
import { useEffect } from "react";
import { videoCollectionQueries } from "@/utilities/queryUtils";
import Image from "next/image";
import { PlaylistType } from "@/types/dataTypes";
import Link from "next/link";
import { formatReadableDate, saveQueryToSession } from "@/utilities/utils";
import Playlist from '@/components/playlist/playlist';
import classNames from "classnames";
import "./home.css"

interface HomeLatestVideosProps {
    latestGoals: PlaylistType[]
}

function HomeLatestVideos({latestGoals}: HomeLatestVideosProps) {

    const onClickVideo = () => {
        const query = videoCollectionQueries({collectionName: "goal"})
        saveQueryToSession(query)
    }

    const latestGoalsList = (
        <div className="latest-videos-list">
            {latestGoals.map((video: PlaylistType, index: number) => {
                return (
                    <Link href={`/video/${video.id}`} key={video.id} className={classNames("latest-video-link", {
                        // "first": index === 0,
                        // "second": index === 1,
                        // "fifth": index === 4,
                        // "sixth": index === 5,
                    })}>
                        {/* <div onClick={onClickVideo} className="latest-video-single" data-aos="fade-up">
                            <div className="latest-video-img-container">
                                <Image 
                                    src={video.thumbnail_url}
                                    alt={video.description || "Video thumbnail"}
                                    fill
                                    className="latest-video-img"
                                    priority
                                />
                            </div>
                            <div className="latest-video-details">
                                <div className="latest-video-type">Event</div>
                                <div className="latest-video-item-title">{video.description}</div>
                                <div className="latest-video-item-date">{formatReadableDate(video.date)}</div>
                            </div>
                        </div> */}
                        <Playlist playlist={video} query={{}}/>
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