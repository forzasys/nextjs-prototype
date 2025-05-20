'use client';
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../api/fetchApi';
import Image from 'next/image';
import { GameType } from '../components/util/dataTypes';
import "./games.css";

function Games() {

    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['games'],
        queryFn: () => fetcher("game", {}),
        enabled: false, // Do not fetch on mount
        staleTime: 1000 * 60 * 3, // 3 minutes stale time
    })
    
    const games = data?.games || []

    console.log("Games data:", data);

    const eventsList = games.map((g: GameType) => {
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

  const onClearCache = () => {
    if (typeof window !== 'undefined') {
      queryClient.clear();
      window.location.reload();
    }
  };

  const renderGames = isLoading ? (
    <div style={{fontSize: "32px"}}>Loading...</div>
  ) : (
    <div>
      {eventsList}
      <br />
      {data && (
        <div onClick={onClearCache}>Clear cache</div>
      )}
    </div>
  )
  
  return (
    <div>
        <br />
        <h1>Games</h1>
        <br />
        <button onClick={() => refetch()} className='fetch-games-btn'>Fetch games</button>
        <br />
        <br />
        {renderGames}
        {error && (
          <div style={{color: "red"}}>Error: {error.message}</div>
        )}
    </div>
  )
}

export default Games