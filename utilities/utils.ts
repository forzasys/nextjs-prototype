import { QueryType } from "@/types/dataTypes";

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