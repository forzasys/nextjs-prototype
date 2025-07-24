import { GameType, PlaylistType, QueryType } from "@/types/dataTypes";
import config from "@/config";
import { format, formatDistanceToNow, isToday, differenceInCalendarDays } from 'date-fns';

export function getGameTime (gameTime: number, phase: string) {

    let isStoppage = false;
    let minute: number = parseInt(Math.ceil(gameTime / 60.0).toFixed())
    let maximum: number | undefined;

    switch (phase) {

        case "1st half":
            maximum = 45
            break
        case "halftime break":
            minute = 45
            break
        case "2nd half":
            maximum = 90
            break
        case "fulltime break":
            minute = 90
            break
        case "1st overtime":
            maximum = 105
            break
        case "overtime break":
            minute = 105
            break
        case "2nd overtime":
            maximum = 120
            break
        case "penalties break":
            minute = 120
            break
        case "penalties":
            minute = 120
            break
        default:
            break
    }

    const isStoppageTime = maximum && minute > maximum

    let time: number | string = minute

    if (isStoppageTime && maximum) {
        time = `${maximum}+${minute - maximum}`;
        isStoppage = true;
    }
    
    return [time, isStoppage]
};

export function getOrCreateTabId() {
    let tabId = sessionStorage.getItem("tabId");
    if (!tabId) {
      tabId = crypto.randomUUID();
      sessionStorage.setItem("tabId", tabId);
    }
    return tabId;
}

export function saveQueryToSession(query: QueryType) {
    const tabId = getOrCreateTabId();
    const key = `query_${tabId}`;
    sessionStorage.setItem(key, JSON.stringify(query));
}

export function loadQueryFromSession() {
    const tabId = getOrCreateTabId();
    const key = `query_${tabId}`;
    const query = sessionStorage.getItem(key);
    return query ? JSON.parse(query) : null;
}

export function formatDuration (duration: number, withHour: boolean | undefined = undefined) {
    if (isNaN(duration)) return "00:00";
    if (withHour === undefined) withHour = duration > 3600;
    let sec = Math.floor(duration);
    let min = Math.floor(sec / 60);
    const hour = Math.floor(min / 60);
    sec %= 60;
    min %= 60;
    if (withHour) return ("0" + hour).slice(-2) + ":" +  ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
    return ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
}

const footballCollectionsToShow = ["goal", "assist", "shot", "penalty", "yellow card", "red card", "save"]
const hockeyCollectionsToShow = ["goal", "assist", "goalkeeperevent", "penalty", "shootoutpenaltyshot", "shot", "save"]
export const collectionsToShow = config.target === "shl" ? hockeyCollectionsToShow : footballCollectionsToShow

export const checkMatchResult = (teamId: number, game: GameType) => {
    let result = "draw";
    if (game.home_team.id === teamId) {
        if (game.home_team_goals > game.visiting_team_goals) {
          result = "won";
        } else if (game.home_team_goals < game.visiting_team_goals) {
          result = "lost";
        } else {
          result = "draw";
        }
    }   else if (game.visiting_team.id === teamId) {
        if (game.visiting_team_goals > game.home_team_goals) {
          result = "won";
        } else if (game.visiting_team_goals < game.home_team_goals) {
          result = "lost";
        } else {
          result = "draw";
        }
    }
    return result;
}

export const checkMultipleMatchesResult = (teamId: number, games: GameType[]) => {
    const results: string[] = []
    games.forEach((game) => {
        const gameResult = checkMatchResult(teamId, game);
        results.push(gameResult);
    })
    return results;
}

export const generateTitleFromQuery = (query: QueryType, playlist: PlaylistType) => {

    const isTeamPlatform = !!config.team
    const playlistTags = playlist.events[0].tags[0]

    let title = ""
    
    const queryTag = query?.tags?.[0]

    if (queryTag?.action) {
        title = queryTag.action
    }

    if (queryTag?.player) {
        if (playlistTags?.player) {
            title += `, ${playlistTags.player.value}`
        }
    }
    
    if (queryTag?.scorer) {
        if (playlistTags?.scorer) {
            title += `, ${playlistTags.scorer.value}`
        }
    }

    if (queryTag?.["assist by"]) {
        if (playlistTags?.["assist by"]) {
            title += `, ${playlistTags["assist by"].value}`
        }
    }

    if (!isTeamPlatform) {
        if (queryTag?.team) {
            title += `, ${queryTag.team.value}`
        }
    }
    
    return title
}

export function formatReadableDate(dateString: string): string {
    const date = new Date(dateString);
  
    if (isToday(date)) {
      return 'Today';
    }
  
    const diff = differenceInCalendarDays(new Date(), date);
  
    if (diff >= 1 && diff <= 7) {
        return formatDistanceToNow(date, { addSuffix: true }).replace('about ', '');
      }
  
    return format(date, 'dd-MM-yyyy');
}

export const getTeamBaseColor = {
    1: "#022ca1",
    9: "#FFFFFF",
    14: "#FBDD00",
    16: "rgb(0, 33, 69)",
    44: "#FFFFFF",
    45: "rgb(206, 58, 58)",
}

export const teamStadiumName = {
    // VIF
    1: "Intility Arena",
    // Brann
    7: "Brann Stadion",
    // S08
    8: "Sarpsborg Stadion",
    // FKH
    9: "Haugesund Sparebank Arena",
    // TIL
    10: "Romssa Arena",
    // B/G
    14: "Aspmyra Stadion",
    // MOL
    15: "Aker Stadion",
    // SIF
    16: "Marienlyst Stadion",
    // SAN
    18: "Jotun Arena",
    // HAM
    35: "Briskeby",
    // KFUM
    39: "KFUM Arena",
    // FFK
    44: "Fredrikstad Stadion",
    // BRFK
    45: "Bryne Stadion",
}