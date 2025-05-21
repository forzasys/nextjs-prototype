'use client';
import warnerBrosImg from "@/public/img/WarnerBros.png";
import Image from 'next/image';

function Home() {
  return (
    <div>
      <h3>Home</h3>
      <br />
      <Image src={warnerBrosImg} alt="Warner Bros Logo" style={{height: "200px", width: "auto"}}/>
    </div>
  );
}

export default Home;