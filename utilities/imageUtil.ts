import vifLogo from "@/public/img/logo/vif-logo.png";
import brannLogo from "@/public/img/logo/brann-logo.png";
import shlLogo from "@/public/img/logo/shl-logo.png";
import shlLogoBlack from "@/public/img/logo/shl-logo-black.png";
import eliteserienLogo from "@/public/img/logo/eliteserien-logo.png";
import { StaticImageData } from "next/image"

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
        1: "https://upload.wikimedia.org/wikipedia/commons/7/76/LLA_during_period_break.jpg",
        2: "https://cdn1-photos.shl.se/photos/17/11/e6a19ff3a5096bb0011e2742cd75b308/thumb_2560.jpg?ixlib=js-3.8.0&auto=format&fp-debug=0&fp-y=0.5&fp-x=0.5&crop=focalpoint&fit=crop&ar=16%3A9&w=1678&s=e8e07dff4bc85a7398634b093a432985",
        3: "https://cdn1-photos.shl.se/photos/19/05/6d455f2f771d023b75ec3ec6ca53f58a/thumb_2560.jpg?ixlib=js-3.8.0&w=1920&h=1080&auto=format&fp-debug=0&fp-y=0.5&fp-x=0.5&crop=focalpoint&fit=crop&s=cf1e0db01e659179612f5c119071fa5e",
        4: "https://cdn1-photos.shl.se/photos/22/09/efb837e71fd304a7c4e344b53b82b171/thumb_2560.jpg?ixlib=js-3.8.0&w=1920&h=1080&auto=format&fp-debug=0&fp-y=0.5&fp-x=0.5&crop=focalpoint&fit=crop&s=8ca27f6b87dfa8f7e4722f63a079bec3",
        5: "https://images.aftonbladet-cdn.se/v2/images/47c726d9-c5e4-466d-ab3b-3ec2463c7d4b?fit=crop&format=auto&h=844&q=50&w=1500&s=4cc6e19c205d01b07d2c0199afa23fe9baf590f3",
        6: "https://scontent.fosl6-1.fna.fbcdn.net/v/t39.30808-6/492479373_1295625835734526_6794400477822837091_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BsL3qcvYl8oQ7kNvwGwoyKm&_nc_oc=AdkOncWiOJOw8NsZUlFV64yFb_0ZExTN-JOvYF-ZtZ0O3MoTi6zm6_0hAy8FeT_sJk65zdjTVEzir-xub66KkiBy&_nc_zt=23&_nc_ht=scontent.fosl6-1.fna&_nc_gid=V_SCEMdVKijNM-cmCG46IQ&oh=00_AfUa_GuP64bKeG6zhiPhfnYHUODG96iWLoq5wzZvLfWVeg&oe=68995988",
        7: "https://chl-cloudinary.corebine.com/chl-production/image/upload/c_fit,dpr_3.0,f_webp,g_center,h_613,q_auto,w_1980/v1/chl-prod/Tifo",
        8: "https://upload.wikimedia.org/wikipedia/commons/0/06/NHK_Arena_Interior_12.jpg",
        9: "https://cdn1-photos.shl.se/photos/15/09/81922f14d5cbba97ee8acd6eeb4d34f9/thumb_940.jpg?ixlib=js-3.8.0&w=1920&h=1080&auto=format&fp-debug=0&fp-y=0.5&fp-x=0.5&crop=focalpoint&fit=crop&s=7d1b39ea429a262add6aebca2441593a",
        10: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.6435-9/168000815_10158065621574290_5245984710149996225_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=HC8IO5vQC_QQ7kNvwGdHQW8&_nc_oc=AdnlXJTNNnKhZtUywyBSI9C2J12VaamYVEPF5jJ41gia3CzB1WGlw-WvfwGJHnUmTd0&_nc_zt=23&_nc_ht=scontent-arn2-1.xx&_nc_gid=PqlMzRTONFuNwFD6dYHEMg&oh=00_AfXsev7sXQG4xCYnTZiKTtWmfjirBFibQrcoR6NNrvkU5w&oe=68BA8F44",
        11: "https://img.seekr.cloud/cover/670/3/geib.jpg",
        12: "https://scontent.fosl6-1.fna.fbcdn.net/v/t1.6435-9/126126591_10157775874464290_5468476788280813341_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LLZ5yJGXknYQ7kNvwGtZ3JD&_nc_oc=Adm4Nd-Wz1QlsTPu_jcUyUbHMp3QqApEamJFSK-XBt9-bHRhkcRgEWgGec0YaAKcoOJmAKCX_OfkKYO4LY1Mhlwi&_nc_zt=23&_nc_ht=scontent.fosl6-1.fna&_nc_gid=WJ_Q-DDvDVE6UGz-zehFrw&oh=00_AfW_B0mxPLJmTsMEeAMrFDYe2G_kFOU5RNYWrW9m2Ghjig&oe=68BB0B79",
        13: "https://cdn1-photos.shl.se/photos/21/12/b58c2878520c0e88b51b2f0cd029ce6c/thumb_2560.jpg?ixlib=js-3.8.0&auto=format&fp-debug=0&fp-y=0.5&fp-x=0.5&crop=focalpoint&fit=crop&ar=16%3A9&w=1678&s=b288cc276dd335a60fa41b565802259e",
        14: "https://pbs.twimg.com/media/FiFkB3QXkAEZabL?format=jpg&name=4096x4096",
        15: "https://hovetarena.se/uploads/sites/5/2024/04/hovet-interior-2050-1024x683.jpg",
        17: "https://www.hogakusten.com/sites/cb_hogakusten/files/styles/cbis_product_large/http/images.citybreak.com/912819.jpeg.webp?itok=vcd29ZAv",
    },
}

export const getClubSiteImage: ImageType = {
    "vif": "https://www.vif-fotball.no/_/image/aae6606d-ed90-4ff8-849c-f5e6e9c56c20:51ea6e02fc00284475414e27bcca56c0b64d814b/width-1600/Dark-Background-2025.png",
    "shl": "https://cdn1-photos.shl.se/photos/25/05/f372dc93-e6c5-486b-b3f1-871c424ef915TruppkollenKarusell16x9v3.jpg?ixlib=js-3.8.0&fp-y=0.5&fp-x=0.5&ar=1.47&crop=focalpoint&fit=crop&w=2257&s=bf88b6dc9ded51c851d2f722e8556133 2257w",
}