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

const vifConfig = {
  apiUrl: 'https://api.forzasys.com/',
  availableSeasons: ["2025", "2024", "2023", "2022", "2021", "2020"],
  clubWebsite: "https://www.vif-fotball.no",
  channel: 6,
  hasStatisticsPage: true,
  league: 'eliteserien',
  leagueWebsite: "https://www.eliteserien.no",
  leagueUrlOverride: overrideLeague,
  target: 'vif',
  team: 1,
};

export default vifConfig;
