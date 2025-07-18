import Image from "next/image"
import { getClubSiteImage } from "@/utilities/imageUtil"
import Link from "next/link"
import { IoArrowForward } from "react-icons/io5";

interface HeadlineClubSiteProps {
    headlinePosition: string
}

function HeadlineClubSite({headlinePosition}: HeadlineClubSiteProps) {

    const clubSiteImage = getClubSiteImage["VIF"]

  return (
    <div style={{transform: `translate(${headlinePosition})`}} className="headline-single">
        <Image 
            src={clubSiteImage} 
            alt="stadium" 
            fill
            className="headline-single-img"
            priority
        />
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