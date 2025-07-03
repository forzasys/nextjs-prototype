'use client';
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { generateGamesQueryFromParams } from '@/utilities/queryUtils';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/utilities/fetchApi';
import { GameType } from '@/types/dataTypes';
import Link from 'next/link';
import Image from 'next/image';
import "./matches.css";

interface MatchesProps {
  gamesData: GameType[];
  isInitialQuery: boolean;
}

function Matches({ gamesData, isInitialQuery }: MatchesProps) {

  const searchParams = useSearchParams();
  const updateParam = useUpdateSearchParam();
  const query = generateGamesQueryFromParams(searchParams);

  const seasonParam = searchParams.get("season");
  const typeParam = searchParams.get("match_type");
  const isFixtures = !typeParam || typeParam === "fixtures";

  useEffect(() => {
    if (isFixtures && seasonParam) updateParam("season", undefined);
  }, [isFixtures, seasonParam, updateParam])

  const { data, isLoading } = useQuery({
    queryKey: ['game', query],
    queryFn: () => onFetch("game", query),
    initialData: gamesData,
    enabled: !isInitialQuery,
    // staleTime: staleTime,
  });
  
  const games = data?.games || [];
  
  const gamesList = games.map((g: GameType) => {
    return (
      <Link key={g.id} href={`match/${g.id}`} className='single-game'>
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
      </Link>
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

export default Matches