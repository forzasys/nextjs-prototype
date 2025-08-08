import Headlines from "../headline/headlines";
import HomePageMatches from "./homePageMatches";
import HomeTopScorer from "./homeTopScorer";
import HomeLatestVideos from "./homeLatestVideos";
import HomePageHighlights from "./homePageHighlights";
import HomePageResults from "./homePageResults";
import { onFetch } from "@/utilities/fetchApi";
import { videoCollectionQueries } from "@/utilities/queryUtils";
import config from "@/config";
import { QueryType } from "@/types/dataTypes";
import "./home.css";

async function Home() {

  // const today = new Date();
  // const formattedToday = today.toISOString().split('T')[0];
  const currentSeason = config.availableSeasons[0]

  // Fetch the minimal data required for home: 4 upcoming fixtures + 4 latest results
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  const fixturesQuery = {
    season: currentSeason,
    from_date: formattedToday,
    asc: true,
    count: 4,
  }
  const resultsQuery = {
    season: currentSeason,
    to_date: formattedToday,
    asc: false,
    count: 4,
  }
  // query.count = 3

  const goalCollectionQuery = videoCollectionQueries({collectionName: "goal"})
  goalCollectionQuery.count = 6

  const topScorerInitialQuery: QueryType = {
    from_date: `${currentSeason}-01-01`,
    to_date: `${currentSeason}-12-31`,
  }

  const highlightsQuery = {
    from: 0,
    count: 30,
    // order_by: "created",
    // asc: true,
    filters: ["playlist"],
    all_leagues: true,
    include_channels: true,
    include_featured_flag: true,
  }

  // Team platform
  const teamPlatformId = config.team
  const isTeamPlatform = !!teamPlatformId
  if (isTeamPlatform) topScorerInitialQuery.team_id = teamPlatformId
  const hasStatisticsPage = config.hasStatisticsPage

  const [
    topScorersData, 
    goalPlaylistData, 
    fixturesData,
    highlightsData,
    resultsData,
  ] = await Promise.all([
    hasStatisticsPage ? onFetch("stats/top/scorer", topScorerInitialQuery) : Promise.resolve([]),
    onFetch("playlist", goalCollectionQuery),
    onFetch("game", fixturesQuery),
    !isTeamPlatform ? onFetch("playlist", highlightsQuery) : Promise.resolve([]),
    onFetch("game", resultsQuery),
  ])

  const topScorers = topScorersData?.players || []
  const goalPlaylists = goalPlaylistData?.playlists || []
  const nextGames = fixturesData?.games || []
  const latestResults = resultsData?.games || []
  const highlights = highlightsData?.playlists || []

  const latestGoals = goalPlaylists.slice(0, 6)

  return (
    <div className="home-container">
      <Headlines game={nextGames[0]}/>
      <HomeLatestVideos latestGoals={latestGoals} />
      {!isTeamPlatform && <HomePageHighlights highlights={highlights} highlightsQuery={highlightsQuery}/>}
      <HomePageResults games={latestResults} />
      <HomePageMatches games={nextGames} />
      {hasStatisticsPage && <HomeTopScorer topScorers={topScorers}/>}
    </div>
  );
}

export default Home;