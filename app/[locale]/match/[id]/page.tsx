import MatchScoreboard from './matchScoreboard';
import MatchCenterFilter from '../../../../components/Filters/matchCenterFilter';
import MatchHeadToHead from './matchHeadToHead';
import MatchStats from './matchStats';
import MatchLineup from './matchLineup';
import MatchEvents from './matchEvents';
import { onFetch } from '@/utilities/fetchApi';
import "./match.css";

interface MatchPageProps {
  params: {
    id: string;
  };
  searchParams: {
    match_center_type?: string;
  };
};

async function Page({ params, searchParams }: MatchPageProps) {

  // Await params and searchParams before accessing their properties
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const gameId = resolvedParams.id;
  const gameData = await onFetch("game/" + gameId)
  const gameEventsData = await onFetch(`/game/${gameId}/events`, { count: 999 })

  const game = gameData || null
  const gameEvents = gameEventsData?.events || [];

  if (!game) return null

  const isUpcomingMatch = game.phase === "not started" && game.start_time > new Date().toISOString()

  const defaultMatchCenterType = isUpcomingMatch ? "headtohead" : "stats";
  const match_center_type = resolvedSearchParams.match_center_type || defaultMatchCenterType;

  let matchInfo

  if (match_center_type === "headtohead") {
    matchInfo = <MatchHeadToHead game={game} />;
  }
  if (match_center_type === "stats") {
    matchInfo = <MatchStats game={game} />;
  }
  if (match_center_type === "lineup") {
    matchInfo = <MatchLineup gameId={gameId} gameEvents={gameEvents} />;
  }
  if (match_center_type === "events") {
    matchInfo = <MatchEvents gameEvents={gameEvents} />;
  }

  return (
    <div className="match-main main-page">
      <MatchScoreboard game={game} gameEvents={gameEvents} />
      <div className='match-center-filter-cont'>
        <MatchCenterFilter defaultType={defaultMatchCenterType} />
      </div>
      <div className="middle-container">
        {matchInfo}
      </div>
    </div>
  )
}

export default Page;