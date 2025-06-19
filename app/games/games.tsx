'use client';
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { generateGamesQueryFromParams } from '@/utils/queryUtil';
import { useUpdateSearchParam } from '@/utils/ClientSideUtil';
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/lib/fetchApi';
import { GameType } from '@/types/dataTypes';
import Image from 'next/image';
import "./games.css";

function Games({gamesData}: {gamesData: GameType[]}) {

  const searchParams = useSearchParams();
  const updateParam = useUpdateSearchParam();
  const query = generateGamesQueryFromParams(searchParams);

  const seasonParam = searchParams.get("season");
  const typeParam = searchParams.get("game_type");
  const isFixtures = !typeParam || typeParam === "fixtures";

  useEffect(() => {
    if (isFixtures && seasonParam) updateParam("season", undefined);
  }, [isFixtures, seasonParam, updateParam])

  const { data, isLoading } = useQuery({
    queryKey: ['game', query],
    queryFn: () => onFetch("game", query),
    initialData: gamesData,
    // staleTime: staleTime,
  });
  
  const games = data?.games || [];

  console.log(games);
  
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

  const render = isLoading ? (
    <div style={{fontSize: "32px"}}>Loading...</div>
  ) : (
    gamesList
  )

  const noFixtures = isFixtures && games.length === 0

  const noFixturesInfo = noFixtures && (
    <div>No more fixtures this season</div>
  )
  
  return (
    <div>
      {render}
      {noFixturesInfo}
    </div>
  )
}

export default Games