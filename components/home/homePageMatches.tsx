import React from 'react'
import { onFetch } from '@/lib/fetchApi';
import { initialGamesQuery } from '@/utils/queryUtil';
import { GameType } from '@/types/dataTypes';
import Image from 'next/image';

async function HomePageMatches() {

    const query = structuredClone(initialGamesQuery)
    query.count = 4

    const gamesData = await onFetch("game", query)
    const games = gamesData?.games || [];

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

    return (
        <div>
            <div>Next matches</div>
            <br />
            {gamesList}
        </div>
    )
}

export default HomePageMatches