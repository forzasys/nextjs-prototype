import Headlines from "../headline/headlines";
import HomePageMatches from "./homePageMatches";
import HomeTopScorer from "./homeTopScorer";
import HomeLatestVideos from "./homeLatestVideos";
import HomeLatestHighlights from "./homeLatestHighlights";
import HomePageHighlights from "./homePageHighlights";
// import { VideoCollectionSlide } from '@/components/videosLibrary/videoCollectionSlide';
import { onFetch } from "@/utilities/fetchApi";
import config from "@/config";
import { GameType } from "@/types/dataTypes";

async function Home() {

  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  console.log(formattedToday)
  console.log(`${config.availableSeasons[0]}-01-01`)

  const query = {
    season: config.availableSeasons[0],
    from_date: "2025-05-01",
    asc: true,
    count: 100,
  }
  // query.count = 3

  const gamesData = await onFetch("game", query)
  const games = gamesData?.games || [];

  const nextThreeGames = games.filter((game: GameType) => new Date(game.date) > new Date()).slice(0, 3)

  const hasStatisticsPage = config.hasStatisticsPage

  return (
    <div className="">
      <Headlines game={nextThreeGames[0]}/>
      <br />
      {/* <VideoCollectionSlide collectionName={"goal"} showCollection={true}/> */}
      <HomeLatestVideos />
      <br />
      <HomeLatestHighlights games={games}/>
      <br />
      <br />
      <br />
      <HomePageHighlights games={games} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <HomePageMatches games={nextThreeGames} />
      <br />
      <br />
      <br />
      {hasStatisticsPage && <HomeTopScorer/>}
      <br />
    </div>
  );
}

export default Home;