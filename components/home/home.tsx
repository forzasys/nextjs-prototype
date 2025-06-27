import warnerBrosImg from "@/public/img/WarnerBros.png";
import Image from 'next/image';
import Collection from "../videosLibrary/collection";
import HomePageMatches from "./homePageMatches";
import HomeTopScorer from "./homeTopScorer";

function Home() {

  return (
    <div>
      <h3>Home</h3>
      <br />
      <Image src={warnerBrosImg} alt="Warner Bros Logo" style={{height: "200px", width: "auto"}}/>
      <br />
      <Collection collection={"latest"}/>
      <br />
      <HomePageMatches />
      <br />
      <HomeTopScorer/>
      <br />
      <Collection collection={"goals"}/>
      <br />
      <Collection collection={"interviews"}/>
    </div>
  );
}

export default Home;