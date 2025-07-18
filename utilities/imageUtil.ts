import vifLogo from "@/public/img/logo/vif-logo.png";
import brannLogo from "@/public/img/logo/brann-logo.png";
import shlLogo from "@/public/img/logo/shl-logo.png";
import eliteserienLogo from "@/public/img/logo/eliteserien-logo.png";
import intilityArena from "@/public/img/stadium/intility-arena.jpg";
import aspmyraStadium from "@/public/img/stadium/aspmyra-stadion.jpg";
import vifClubSiteImage from "@/public/img/clubSite/vif-club-site.png";
import { StaticImageData } from "next/image";

interface ImageType {
    [key: string]: StaticImageData | string
}

export const getHeaderLogo: ImageType = {
    "brann": brannLogo,
    "vif": vifLogo,
    "shl": shlLogo,
}

export const getLeagueLogo: ImageType = {
    "eliteserien": eliteserienLogo,
}

export const getStadiumImage: ImageType = {
    "VIF": intilityArena,
    "B/G": aspmyraStadium,
}

export const getClubSiteImage: ImageType = {
    "VIF": vifClubSiteImage,
}