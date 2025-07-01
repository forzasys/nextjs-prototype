import warnerBrosImg from "@/public/img/WarnerBros.png";
import Image from 'next/image';
import { VideoCollection } from '@/components/videosLibrary/videoCollection';
import HomePageMatches from "./homePageMatches";
import HomeTopScorer from "./homeTopScorer";

function Home() {

  return (
    <div>
      <h3>Home</h3>
      <br />
      <Image src={warnerBrosImg} alt="Warner Bros Logo" style={{height: "200px", width: "auto"}}/>
      <br />
      <VideoCollection collectionName={"latest"}/>
      <br />
      <HomePageMatches />
      <br />
      <HomeTopScorer/>
      <br />
      <VideoCollection collectionName={"goal"}/>
      <br />
      <VideoCollection collectionName={"interviews"}/>
    </div>
  );
}

export default Home;