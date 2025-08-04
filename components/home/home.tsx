import Headlines from "../headline/headlines";
import HomePageMatches from "./homePageMatches";
import HomeTopScorer from "./homeTopScorer";
import HomeLatestVideos from "./homeLatestVideos";
// import HomeLatestHighlights from "./homeLatestHighlights";
import HomePageHighlights from "./homePageHighlights";
// import { VideoCollectionSlide } from '@/components/videosLibrary/videoCollectionSlide';
import { onFetch } from "@/utilities/fetchApi";
import { videoCollectionQueries } from "@/utilities/queryUtils";
import config from "@/config";
import { GameType, QueryType } from "@/types/dataTypes";
import "./home.css";

async function Home() {

  // const today = new Date();
  // const formattedToday = today.toISOString().split('T')[0];
  const currentSeason = config.availableSeasons[0]

  const query = {
    season: config.availableSeasons[0],
    from_date: "2025-03-01",
    asc: true,
    count: 100,
  }
  // query.count = 3

  const goalCollectionQuery = videoCollectionQueries({collectionName: "goal"})
  goalCollectionQuery.count = 6

  const topScorerInitialQuery: QueryType = {
    from_date: `${currentSeason}-01-01`,
    to_date: `${currentSeason}-12-31`,
  }

  // Team platform
  const teamPlatformId = config.team
  if (teamPlatformId) topScorerInitialQuery.team_id = teamPlatformId
  const hasStatisticsPage = config.hasStatisticsPage

  const topScorersData = hasStatisticsPage ? await onFetch("stats/top/scorer", topScorerInitialQuery) : []
  const topScorers = topScorersData?.players || []

  const latestGoalsData = await onFetch("playlist", goalCollectionQuery)
  const latestGoals = latestGoalsData?.playlists || []

  const gamesData = await onFetch("game", query)
  const games = gamesData?.games || []

  const nextGames = games.filter((game: GameType) => new Date(game.date) > new Date()).slice(0, 4)

  return (
    <div className="home-container">
      <Headlines game={nextGames[0]}/>
      {/* <VideoCollectionSlide collectionName={"goal"} showCollection={true}/> */}
      <HomeLatestVideos latestGoals={latestGoals} />
      {/* <HomeLatestHighlights games={games}/> */}
      <HomePageHighlights games={games} />
      <HomePageMatches games={nextGames} />
      {hasStatisticsPage && <HomeTopScorer topScorers={topScorers}/>}
    </div>
  );
}

export default Home;