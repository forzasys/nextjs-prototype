import warnerBrosImg from "@/public/img/WarnerBros.png";
import Image from 'next/image';
import { EventType } from '@/types/dataTypes';

function Home({ latestGoals }: { latestGoals: EventType[] }) {

  const renderLatestGoals = (
    <div>
      <h4>Latest goals</h4>
      {latestGoals.map((e: EventType) => {
        return (
          <div key={e.id}>
            {e.playlist.description}
          </div>
        )
      })}
    </div>
  )

  return (
    <div>
      <h3>Home</h3>
      <br />
      <Image src={warnerBrosImg} alt="Warner Bros Logo" style={{height: "200px", width: "auto"}}/>
      <br />
      <br />
      {renderLatestGoals}
    </div>
  );
}

export default Home;