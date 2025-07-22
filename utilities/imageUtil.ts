import vifLogo from "@/public/img/logo/vif-logo.png";
import brannLogo from "@/public/img/logo/brann-logo.png";
import shlLogo from "@/public/img/logo/shl-logo.png";
import eliteserienLogo from "@/public/img/logo/eliteserien-logo.png";
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
    "BRFK": "https://www.brynefk.no/om-stadion/Bryne%20Stadion/_/image/96fb33b6-a748-48de-98f9-c714a26d8189:f559c73dbaab8aef066ae2e3a520d760b11b9d49/wide-1170-810/IMG_3415.jpeg",
    "B/G": "https://g.acdn.no/obscura/API/dynamic/r1/ece5/tr_1200_1200_s_f/0000/nndb/2024/12/14/23/Aspmyra%2B1.jpg?chk=4D93EC",
    "VIF": "https://www.hent.no/wp-content/uploads/2021/06/1192_07.jpg",
    
}

export const getClubSiteImage: ImageType = {
    "VIF": vifClubSiteImage,
}