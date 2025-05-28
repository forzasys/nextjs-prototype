import React from 'react'
import { GameType } from '@/types/dataTypes';
import Link from 'next/link';
import Image from 'next/image';
import "./games.css";

function Games({games}: {games: GameType[]}) {

  const gamesList = games.map((g: GameType) => {
    return (
      <div key={g.id} className='single-game'>
        <div className='single-game-team-logo'>
          <Image src={g.home_team.logo_url} alt="team logo" fill sizes="30px" className="team-logo-img"/>
        </div>
        <div>{g.home_team.name}</div>
        <div>{g.home_team_goals}</div>
        <div>-</div>
        <div>{g.visiting_team_goals}</div>
        <div>{g.visiting_team.name}</div>
        <div className='single-game-team-logo'>
          <Image src={g.visiting_team.logo_url} alt="team logo" fill sizes="30px" className="team-logo-img"/>
        </div>
      </div>
    )
  })

  const seasons = [2025, 2024, 2023, 2022];

  const seasonsList = seasons.map((s) => {
    return (
      <button key={s} className='select-season-btn'>
        <Link href={`/games?season=${s}`} >
          {s}
        </Link>
      </button>
      
    )
  })
  
  return (
    <div>
      {seasonsList}
      <br />
      <br />
      {gamesList}
    </div>
  )
}

export default Games