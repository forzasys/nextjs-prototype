import React from 'react'
import { onFetch } from '@/lib/fetchApi';
import { initialGamesQuery } from '@/utils/queryUtils';
import { GameType } from '@/types/dataTypes';
import config from '@/config';
import Image from 'next/image';
import Link from 'next/link';

async function HomePageMatches() {

    const query = structuredClone(initialGamesQuery)
    query.count = 4

    const teamPlatformId = config.team
    if (teamPlatformId) query.team_id = teamPlatformId

    const gamesData = await onFetch("game", query)
    const games = gamesData?.games || [];

    const gamesList = games.map((g: GameType) => {
        return (
          <Link key={g.id} href={`match/${g.id}`} style={{display: "flex"}} className='single-game'>
            <div className='single-game-team-logo'>
              <Image src={g.home_team.logo_url} alt="team logo" width={30} height={30}/>
            </div>
            <div>{g.home_team.name}</div>
            <div>{g.home_team_goals}</div>
            <div>-</div>
            <div>{g.visiting_team_goals}</div>
            <div>{g.visiting_team.name}</div>
            <div className='single-game-team-logo'>
              <Image src={g.visiting_team.logo_url} alt="team logo" width={30} height={30}/>
            </div>
          </Link>
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