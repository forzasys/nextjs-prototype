"use client";
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { generateGamesQueryFromParams } from '@/utilities/queryUtils';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/utilities/fetchApi';
import { GameType } from '@/types/dataTypes';
import config from '@/config';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getLeagueLogo } from '@/utilities/imageUtil';
import { format, parseISO } from 'date-fns';
import { teamStadiumName } from '@/utilities/utils';
import classNames from 'classnames';
import { HiOutlineArrowRight } from "react-icons/hi";
import "./matches.css";

function Match ({game}: {game: GameType}) {

  const t = useTranslations();
  const locale = useLocale();
  const matchNotStarted = game.phase === "not started" && new Date(game.date).getTime() > new Date().getTime()

  const date = format(game.date, 'EEE, dd MMM yyyy');
  const time = format(parseISO(game.start_time), 'HH:mm')
  const leagueLogo = getLeagueLogo[config.league as keyof typeof getLeagueLogo]
  const stadiumName = teamStadiumName[config.league as keyof typeof teamStadiumName]?.[game.home_team.id] || ""

  const score = (
    <div className='single-match-score'>
      <div className='single-match-score-box'>{game.home_team_goals}</div>
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
      href={`/${locale}/match/${game.id}`} 
      className='single-match' 
      >
      <div className='single-match-stadium'>
        {stadiumName}
      </div>
      <div className='single-match-date'>
        {date}
      </div>
      <div className={classNames("single-match-live", {visible: game.has_live_playlist})}>
        live
      </div>
      <div className='single-match-content'>
        <div className='single-match-team'>
          <div className='single-match-team-name'>{game.home_team.name}</div>
          <div className='single-match-team-logo'>
            <Image src={game.home_team.logo_url} alt="team logo" fill sizes="()" />
          </div>
        </div>
        <div className='single-match-middle'>
          {matchMiddle}
        </div>  
        <div className='single-match-team away'>
          <div className='single-match-team-logo'>
            <Image src={game.visiting_team.logo_url} alt="team logo" fill sizes="()" />
          </div>
          <div className='single-match-team-name'>{game.visiting_team.name}</div>
        </div>
      </div>
      <div className='single-match-separator'></div>
      <div className="single-match-center">
        {matchNotStarted ? t("match center") : t("match report")}
        <HiOutlineArrowRight/>
      </div>
      <div className='single-match-league'>
        <Image src={leagueLogo} alt="league logo" fill sizes="()" />
      </div>
    </Link>
  )
}

interface MatchesProps {
  gamesData: { games: GameType[] } | undefined;
}

function Matches({ gamesData }: MatchesProps) {

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
    // Ensure initial server data is treated as fresh to avoid double fetch
    initialDataUpdatedAt: Date.now(),
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
  
  const games = data?.games || gamesData?.games || [];

  const render = isLoading ? (
    <div style={{fontSize: "32px"}}>Loading...</div>
  ) : (
    <div className="matches-list">
      {games.map((game: GameType, index: number) => {
        const month = format(game.date, 'MMMM');
        const prevMonth = index > 0 ? format(games[index - 1].date, 'MMMM') : null;
        const showMonth = month !== prevMonth;
        
        return (
          <div 
            key={game.id} 
            className='match-single-and-month'
            data-aos="fade-up" 
            data-aos-delay={index <= 2 ? index * 100 : 0}
            >
            {showMonth && <div className='match-single-month'>{month}</div>}
            <Match game={game} />
          </div>
        )
      })}
    </div>
  )

  const noFixtures = isFixtures && games.length === 0

  const noFixturesInfo = noFixtures && (
    <div>No upcoming fixtures this season</div>
  )
  
  return (
    <div className="matches-container middle-container">
      {render}
      {noFixturesInfo}
    </div>
  )
}

export default React.memo(Matches)