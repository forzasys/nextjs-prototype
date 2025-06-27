// Define types for target configuration
// type TargetType = {
//   apiUrl: string;
//   availableSeasons: string[];
//   hasStatisticsPage: boolean;
//   league: string | string[];
//   target: string;
// }

// type TargetConfigType = {
//   [key: string]: {
//     apiUrl: string;
//     league: string | string[];
//     team?: number;
//   };
// }

type LeagueUrlOverrideFunction = (url: URL) => void;

function overrideLeague(url: URL) {
  const toDate = url.searchParams.get("to_date");
  const fromDate = url.searchParams.get("from_date");
  const season = url.searchParams.get("season");
  
  // VIF in obosligaen in 2024
  const within2024Season = toDate && fromDate && new Date(toDate) < new Date("2025-01-01") && new Date(fromDate) > new Date("2023-12-31")
  const is2024Season = season === "2024"
  
  if (within2024Season || is2024Season) {
    url.pathname = url.pathname.replace("/eliteserien/", "/obosligaen/");
  }
}

const target = process.env.NEXT_PUBLIC_TARGET || "sef"
// const isDevEnvironment = process.env.NODE_ENV === "development"

const availableSeasons = ["2025", "2024", "2023", "2022", "2021", "2020"]
const hasStatisticsPage = target === "sef" || target === "vaalerenga"

let apiUrl: string = ""
let league: string | string[] = ""
let leagueUrlOverride: LeagueUrlOverrideFunction | undefined = undefined
let team = undefined
let channel = undefined

if (target === "sef") {
  // apiUrl: "https://api.fotbollplay.se/"
  apiUrl = "https://api.forzify.com/"
  league = ["allsvenskan", "superettan"]
}

if (target === "staging-sef") {
  apiUrl = "https://staging-api.forzify.com/"
  league = ["allsvenskan", "superettan"]
}

if (target === "vaalerenga") {
  apiUrl = "https://api.forzify.com/"
  channel = 6
  league = "eliteserien"
  team = 1
  leagueUrlOverride = overrideLeague
}

if (target === "shl") {
  apiUrl = "https://api.forzify.com/"
  league = "shl"
}

// Define base config with common seasons
const Config = {
  apiUrl,
  availableSeasons,
  channel,
  hasStatisticsPage,
  league,
  leagueUrlOverride,
  target,
  team,
}

export default Config