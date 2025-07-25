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
import { getLeagueLogo } from '@/utilities/imageUtil';
import { format, parseISO } from 'date-fns';
import { teamStadiumName } from '@/utilities/utils';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./matches.css";

function Match ({game, index}: {game: GameType, index: number}) {

  useEffect(() => {
    AOS.init({
      offset: 50,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const matchNotStarted = game.phase === "not started" && new Date(game.date) > new Date()
  const date = format(game.date, 'EEE, dd MMM yyyy');
  const time = format(parseISO(game.start_time), 'HH:mm')
  const leagueLogo = getLeagueLogo["eliteserien"]
  const stadiumName = teamStadiumName[game.home_team.id as keyof typeof teamStadiumName]

  const score = (
    <div className='single-match-score'>
      <div className='single-match-score-box'>{game.home_team_goals}</div>
      <div className='single-match-score-separator'>-</div>
      <div className='single-match-score-box'>{game.visiting_team_goals}</div>
    </div>
  )

  const matchTime = (
    <div className='single-match-time'>
      <div>{time}</div>
    </div>
  )

  const matchMiddle = matchNotStarted ? matchTime : score

  return (
    <Link 
      key={game.id} 
      href={`match/${game.id}`} 
      className='single-match' 
      data-aos="fade-up" 
      data-aos-delay={index <= 2 ? index * 100 : 0}
      >
      <div className='single-match-date'>
        {date}
      </div>
      <div className='single-match-stadium'>
        {stadiumName}
      </div>
      <div className='single-match-content'>
        <div className='single-match-team'>
          <div>{game.home_team.name}</div>
          <div className='single-match-team-logo'>
            <Image src={game.home_team.logo_url} alt="team logo" fill priority/>
          </div>
        </div>
        <div className='single-match-middle'>
          {matchMiddle}
        </div>  
        <div className='single-match-team away'>
          <div className='single-match-team-logo'>
            <Image src={game.visiting_team.logo_url} alt="team logo" fill priority/>
          </div>
          <div>{game.visiting_team.name}</div>
        </div>
      </div>
      <div className="single-match-center">
        Match center
      </div>
      <div className='single-match-league'>
        <Image src={leagueLogo} alt="league logo" fill priority/>
      </div>
    </Link>
  )
}

interface MatchesProps {
  gamesData: GameType[];
  isInitialQuery: boolean;
}

function Matches({ gamesData, isInitialQuery }: MatchesProps) {

  const searchParams = useSearchParams();
  const {updateParam} = useUpdateSearchParam();
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

  const render = isLoading ? (
    <div style={{fontSize: "32px"}}>Loading...</div>
  ) : (
    <div className="matches-list">
      {games.map((game: GameType, index: number) => {
        return <Match key={game.id} game={game} index={index} />
      })}
    </div>
  )

  const noFixtures = isFixtures && games.length === 0

  const noFixturesInfo = noFixtures && (
    <div>No upcoming fixtures this season</div>
  )
  
  return (
    <div className="middle-container">
      <br />
      <br />
      <br />
      <br />
      {render}
      {noFixturesInfo}
    </div>
  )
}

export default Matches