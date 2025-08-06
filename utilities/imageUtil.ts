import vifLogo from "@/public/img/logo/vif-logo.png";
import brannLogo from "@/public/img/logo/brann-logo.png";
import shlLogo from "@/public/img/logo/shl-logo.png";
import shlLogoBlack from "@/public/img/logo/shl-logo-black.png";
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
    "shl": shlLogoBlack,
}

interface StadiumImageType {
    [key: string]: {
        [key: number]: StaticImageData | string
    }
}

export const getStadiumImage: StadiumImageType = {
    "eliteserien": {
        1: "https://www.hent.no/wp-content/uploads/2021/06/1192_07.jpg",
        14: "https://g.acdn.no/obscura/API/dynamic/r1/ece5/tr_1200_1200_s_f/0000/nndb/2024/12/14/23/Aspmyra%2B1.jpg?chk=4D93EC",
        // 14: "https://www.glimt.no/nyheter/pressemelding-vedrorende-aspmyra-sportsbar/_/image/525250dc-6fb8-42f1-af52-bcdc66236af9:cf5893c578be0ec4e7d2f1c508c2222dfd1ce2c3/wide-1600-900/Aspmyra.png.jpg",
        45: "https://www.brynefk.no/om-stadion/Bryne%20Stadion/_/image/96fb33b6-a748-48de-98f9-c714a26d8189:f559c73dbaab8aef066ae2e3a520d760b11b9d49/wide-1170-810/IMG_3415.jpeg",
    },
    "shl": {
        7: "https://chl-cloudinary.corebine.com/chl-production/image/upload/c_fit,dpr_3.0,f_webp,g_center,h_613,q_auto,w_1980/v1/chl-prod/Tifo",
        9: "https://cdn1-photos.shl.se/photos/15/09/81922f14d5cbba97ee8acd6eeb4d34f9/thumb_940.jpg?ixlib=js-3.8.0&w=1920&h=1080&auto=format&fp-debug=0&fp-y=0.5&fp-x=0.5&crop=focalpoint&fit=crop&s=7d1b39ea429a262add6aebca2441593a",
        10: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.6435-9/168000815_10158065621574290_5245984710149996225_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=HC8IO5vQC_QQ7kNvwGdHQW8&_nc_oc=AdnlXJTNNnKhZtUywyBSI9C2J12VaamYVEPF5jJ41gia3CzB1WGlw-WvfwGJHnUmTd0&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_gid=PqlMzRTONFuNwFD6dYHEMg&oh=00_AfXsev7sXQG4xCYnTZiKTtWmfjirBFibQrcoR6NNrvkU5w&oe=68BA8F44",
        15: "https://hovetarena.se/uploads/sites/5/2024/04/hovet-interior-2050-1024x683.jpg",
    },
}

export const getClubSiteImage: ImageType = {
    "VIF": vifClubSiteImage,
}