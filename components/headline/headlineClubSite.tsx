import Image from "next/image"
import { getClubSiteImage } from "@/utilities/imageUtil"
import Link from "next/link"
import { IoArrowForward } from "react-icons/io5";

interface HeadlineClubSiteProps {
    show: boolean
}

function HeadlineClubSite({show}: HeadlineClubSiteProps) {

    const clubSiteImage = getClubSiteImage["VIF"]

    if (!show) return null

    return (
        <div className="headline-single">
            {clubSiteImage && (
                <Image 
                    src={clubSiteImage} 
                    alt="wallpaper" 
                    fill
                    priority
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
                    <br />
                    <Link href="https://www.vif-fotball.no" target="_blank" className="headline-text-link">
                        <div>www.vif-fotball.no</div>
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