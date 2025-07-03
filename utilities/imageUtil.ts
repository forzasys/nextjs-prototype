import vifLogo from "@/public/img/vif-logo.png";
import brannLogo from "@/public/img/brann-logo.png";
import { StaticImageData } from "next/image";

interface HeaderLogo {
    [key: string]: StaticImageData | string
}

export const getHeaderLogo: HeaderLogo = {
    "brann": brannLogo,
    "vif": vifLogo,
}