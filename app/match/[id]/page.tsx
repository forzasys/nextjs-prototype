import MatchScoreboard from './matchScoreboard';
import MatchCountdown from './matchCountdown';
import MatchInfoTypes from './matchInfoTypes';
import MatchHeadToHead from './matchHeadToHead';
import MatchStats from './matchStats';
import MatchLineup from './matchLineup';
import MatchEvents from './matchEvents';
import { onFetch } from '@/utilities/fetchApi';

interface MatchPageProps {
  params: {
    id: string;
  };
  searchParams: {
    match_info?: string;
  };
};

async function Page({ params, searchParams }: MatchPageProps) {

  // Await params and searchParams before accessing their properties
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const gameId = resolvedParams.id;
  const match_info = resolvedSearchParams.match_info;

  const gameData = await onFetch("game/" + gameId)
  const gameEventsData = await onFetch(`/game/${gameId}/events`, { count: 999 })

  const game = gameData || null
  const gameEvents = gameEventsData?.events || [];

  if (!game) return null

  const isUpcomingMatch = game.phase === "not started" && game.start_time > new Date().toISOString()

  let matchInfo = isUpcomingMatch ? <MatchHeadToHead game={game} /> :  <MatchStats gameId={gameId} /> 

  if (match_info === "headtohead") {
    matchInfo = <MatchHeadToHead game={game} />;
  }
  if (match_info === "stats") {
    matchInfo = <MatchStats gameId={gameId} />;
  }
  if (match_info === "lineup") {
    matchInfo = <MatchLineup gameId={gameId} gameEvents={gameEvents} />;
  }
  if (match_info === "events") {
    matchInfo = <MatchEvents gameEvents={gameEvents} />;
  }

  return (
    <div className="middle-container">
      <MatchScoreboard game={game} gameEvents={gameEvents} />
      <br />
      {isUpcomingMatch && <MatchCountdown game={game} />}
      <br />
      <MatchInfoTypes />
      <br />
      {matchInfo}
    </div>
  )
}

export default Page;