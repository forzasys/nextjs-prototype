import vifLogo from "@/public/img/logo/vif-logo.png";
import brannLogo from "@/public/img/logo/brann-logo.png";
import shlLogo from "@/public/img/logo/shl-logo.png";
import eliteserienLogo from "@/public/img/logo/eliteserien-logo.png";
import intilityArena from "@/public/img/stadium/intility-arena.jpg";
import { StaticImageData } from "next/image";

interface LogoType {
    [key: string]: StaticImageData | string
}

export const getHeaderLogo: LogoType = {
    "brann": brannLogo,
    "vif": vifLogo,
    "shl": shlLogo,
}

export const getLeagueLogo: LogoType = {
    "eliteserien": eliteserienLogo,
}

export const getStadiumImage: LogoType = {
    "VIF": intilityArena,
}