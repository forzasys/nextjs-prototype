import MatchScoreboard from './matchScoreboard';
import MatchInfoTypes from './matchInfoTypes';
import MatchStats from './matchStats';
import MatchLineup from './matchLineup';
import MatchEvents from './matchEvents';
import { onFetch } from '@/lib/fetchApi';

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    match_info?: string;
  };
};

async function Page({ params, searchParams }: Props) {
  
  const { id } = params;

  const gameEventsData = await onFetch(`/game/${id}/events`, {count: 999})
  const gameEvents = gameEventsData?.events || []

  const matchInfoType = searchParams.match_info;

  let matchInfo = <MatchStats gameId={id}/>
  if (matchInfoType === "lineup") matchInfo = <MatchLineup gameId={id} gameEvents={gameEvents}/>
  if (matchInfoType === "events") matchInfo = <MatchEvents gameEvents={gameEvents}/>

  return (
    <div>
      <MatchScoreboard gameId={id} gameEvents={gameEvents}/>
      <br />
      <MatchInfoTypes/>
      <br />
      {matchInfo}
    </div>
  )
}

export default Page