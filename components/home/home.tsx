import { VideoCollection } from '@/components/videosLibrary/videoCollection';
import HomePageMatches from "./homePageMatches";
import HomeTopScorer from "./homeTopScorer";

function Home() {

  return (
    <div>
      <h3>Home</h3>
      <br />
      <HomePageMatches />
      <br />
      <HomeTopScorer/>
      <br />
      <VideoCollection collectionName={"goal"}/>
      <br />
    </div>
  );
}

export default Home;