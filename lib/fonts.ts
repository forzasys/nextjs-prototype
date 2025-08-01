import { Lato } from "next/font/google";
import { Exo } from "next/font/google";
import { Jura } from "next/font/google";
import { Titillium_Web } from "next/font/google";
import { Gemunu_Libre } from "next/font/google";
import { Text_Me_One } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const exo = Exo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const jura = Jura({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
});

const textMeOne = Text_Me_One({
  subsets: ["latin"],
  weight: ["400"],
});

const gemunuLibre = Gemunu_Libre({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const fonts = `
    ${lato.className}
    ${exo.className}
    ${titillium.className} 
    ${textMeOne.className} 
    ${jura.className} 
    ${gemunuLibre.className}
`
