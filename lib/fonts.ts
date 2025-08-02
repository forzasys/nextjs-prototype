import { Lato } from "next/font/google";
import { Exo } from "next/font/google";
import { Jura } from "next/font/google";
import { Titillium_Web } from "next/font/google";
import { Gemunu_Libre } from "next/font/google";
import { Text_Me_One } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Orbitron } from "next/font/google";
import { Exo_2 } from "next/font/google";
import { Dosis } from "next/font/google";
import { Smooch_Sans } from "next/font/google";

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

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const dosis = Dosis({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const smoochSans = Smooch_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const fonts = `
    ${lato.className}
    ${exo.className}
    ${titillium.className} 
    ${textMeOne.className} 
    ${jura.className} 
    ${gemunuLibre.className}
    ${montserrat.className}
    ${orbitron.className}
    ${exo2.className}
    ${dosis.className}
    ${smoochSans.className}
`
