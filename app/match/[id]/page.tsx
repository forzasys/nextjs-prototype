import MatchScoreboard from './matchScoreboard';
import MatchInfoTypes from './matchInfoTypes';
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

  const gameEventsData = await onFetch(`/game/${gameId}/events`, { count: 999 });
  const gameEvents = gameEventsData?.events || [];

  let matchInfo = <MatchStats gameId={gameId} />;
  
  if (match_info === "lineup")
    matchInfo = <MatchLineup gameId={gameId} gameEvents={gameEvents} />;
  if (match_info === "events")
    matchInfo = <MatchEvents gameEvents={gameEvents} />;

  return (
    <div>
      <MatchScoreboard gameId={gameId} gameEvents={gameEvents} />
      <br />
      <MatchInfoTypes />
      <br />
      {matchInfo}
    </div>
  )
}

export default Page;