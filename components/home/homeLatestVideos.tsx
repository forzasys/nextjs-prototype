import { videoCollectionQueries } from "@/utilities/queryUtils";
import { PlaylistType } from "@/types/dataTypes";
import Playlist from '@/components/playlist/playlist';
import Link from 'next/link';
import { useLocale, useTranslations } from "next-intl";
import classNames from "classnames";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import "./home.css"

interface HomeLatestVideosProps {
    latestGoals: PlaylistType[]
}

function HomeLatestVideos({latestGoals}: HomeLatestVideosProps) {

    const t = useTranslations();
    const locale = useLocale();
    const query = videoCollectionQueries({collectionName: "goal"})

    const latestGoalsList = (
        <div className="latest-videos-list">
            {latestGoals.map((video: PlaylistType) => {
                return (
                    <div key={video.id} className={classNames("latest-video-link", {
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
                        <Playlist playlist={video} query={query} line />
                    </div>
                )
            })}
        </div>
    )

    return (
        <div className="latest-videos-container middle-container">
            <div className="section-header">
                <div className="section-title">
                    {t("latest videos")}
                    <div className="section-title-mask"></div>
                </div>  
                <Link href={`/${locale}/${t("videos")}`} className="section-more">
                    {t("more latest videos")}
                    <RiArrowRightDoubleLine />
                </Link>
            </div>
            {latestGoalsList}
        </div>
    )
}

export default HomeLatestVideos