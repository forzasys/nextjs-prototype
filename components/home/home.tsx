import Headlines from "../headline/headlines";
import HomePageMatches from "./homePageMatches";
import HomeTopScorer from "./homeTopScorer";
import { VideoCollectionSlide } from '@/components/videosLibrary/videoCollectionSlide';
import { onFetch } from "@/utilities/fetchApi";
import { initialGamesQuery } from "@/utilities/queryUtils";
import config from "@/config";

async function Home() {

  const query = structuredClone(initialGamesQuery)
  query.count = 4

  const gamesData = await onFetch("game", query)
  const games = gamesData?.games || [];

  const hasStatisticsPage = config.hasStatisticsPage

  return (
    <div className="">
      <h3 className='middle-container'>Home</h3>
      <br />
      <Headlines game={games[0]}/>
      <br />
      <VideoCollectionSlide collectionName={"goal"} showCollection={true}/>
      <HomePageMatches games={games} />
      <br />
      {hasStatisticsPage && <HomeTopScorer/>}
      <br />
    </div>
  );
}

export default Home;