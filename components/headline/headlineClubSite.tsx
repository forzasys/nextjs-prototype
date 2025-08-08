import Image from "next/image"
import { getClubSiteImage } from "@/utilities/imageUtil"
import Link from "next/link"
import config from "@/config"
import { getLeagueLink } from "@/utilities/utils"
import { IoArrowForward } from "react-icons/io5";
import "./headline.css"

interface HeadlineClubSiteProps {
    show: boolean
}

function HeadlineClubSite({show}: HeadlineClubSiteProps) {

    const clubSiteImage = getClubSiteImage[config.target as keyof typeof getClubSiteImage]
    const leagueLink = getLeagueLink[config.target as keyof typeof getLeagueLink]

    if (!show) return null

    return (
        <div className="headline-single">
            {clubSiteImage && (
                <Image 
                    src={clubSiteImage} 
                    alt="wallpaper" 
                    fill
                    sizes="()"
                    className="headline-single-img blur-in"
                    data-aos="fade"
                    data-aos-duration="1000"
                />
            )}
            <div className="headline-content middle-container">
                <div className="headline-text">
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                    <Link href="https://www.vif-fotball.no" target="_blank" className="headline-text-link">
                        <div>{leagueLink}</div>
                        <IoArrowForward />
                    </Link>
                </div>
            </div>
            <div className="headline-img-mask-left"></div>
            <div className="headline-img-mask-right"></div>
        </div>
    )
}

export default HeadlineClubSite