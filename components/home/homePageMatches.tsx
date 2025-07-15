import React from 'react'
import { GameType } from '@/types/dataTypes';
import Image from 'next/image';
import Link from 'next/link';

interface HomePageMatchesProps {
    games: GameType[]
}

async function HomePageMatches({games}: HomePageMatchesProps) {

    const gamesList = games.map((g: GameType) => {
      return (
        <Link key={g.id} href={`match/${g.id}`} style={{display: "flex"}} className='single-game'>
          <div>
            <Image src={g.home_team.logo_url} alt="team logo" width={30} height={30}/>
          </div>
          <div>{g.home_team.name}</div>
          <div>{g.home_team_goals}</div>
          <div>-</div>
          <div>{g.visiting_team_goals}</div>
          <div>{g.visiting_team.name}</div>
          <div>
            <Image src={g.visiting_team.logo_url} alt="team logo" width={30} height={30}/>
          </div>
        </Link>
      )
    })

    return (
      <div className='middle-container'>
          <div>Next matches</div>
          <br />
          {gamesList}
      </div>
    )
}

export default HomePageMatches