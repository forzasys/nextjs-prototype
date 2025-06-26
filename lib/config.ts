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

const target = process.env.NEXT_PUBLIC_TARGET || "sef"
// const isDevEnvironment = process.env.NODE_ENV === "development"

let availableSeasons = ["2025", "2024", "2023", "2022", "2021", "2020"]
const hasStatisticsPage = target === "sef" || target === "vaalerenga"

let apiUrl: string = ""
let league: string | string[] = ""
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
  availableSeasons = ["2024", "2023", "2022", "2021", "2020"]
  channel = 6
  league = "eliteserien"
  team = 1
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
  target,
  team,
}

export default Config