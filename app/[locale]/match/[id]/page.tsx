import { onFetch } from '@/utilities/fetchApi';
import config from '@/config';
import MatchScoreboard from './matchScoreboard';
import MatchCenterFilter from '../../../../components/Filters/matchCenterFilter';
import MatchHeadToHead from './matchHeadToHead';
import MatchStats from './matchStats';
// import MatchLineup from './matchLineup';
import MatchEvents from './matchEvents';
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
  const hasStatistics = config.hasStatisticsPage;

  const currentSeason = config.availableSeasons[0]
  const tableInitialQuery = {
    season: currentSeason,
    to_date: `${currentSeason}-12-31`,
  }

  // Fetch game first to decide what else we need
  const gameData = await onFetch("game/" + gameId)
  const game = gameData || null

  if (!game) return null

  const isUpcomingMatch = game.phase === "not started" && game.start_time > new Date().toISOString()
  const isFinishedMatch = game.phase === "finished"

  const defaultMatchCenterType = isUpcomingMatch ? "headtohead" : "stats";
  const match_center_type = resolvedSearchParams.match_center_type || defaultMatchCenterType;

  const needEvents = isFinishedMatch || match_center_type === "events"
  const needTable = hasStatistics && match_center_type === "headtohead"
  const needStats = match_center_type === "stats"

  const [
    gameEventsData,
    tableData,
    matchStatsData,
  ] = await Promise.all([
    needEvents ? onFetch(`/game/${gameId}/events`, { count: 200 }) : Promise.resolve(null),
    needTable ? onFetch("stats/table", tableInitialQuery) : Promise.resolve(null),
    needStats ? onFetch(`/game/${gameId}/stats`) : Promise.resolve(null),
  ])

  const gameEvents = gameEventsData?.events || [];
  const table = tableData?.teams || []
  const statistics = matchStatsData?.statistics || null
  let matchInfo

  if (match_center_type === "headtohead") {
    matchInfo = <MatchHeadToHead game={game} table={table} />;
  }
  if (match_center_type === "stats") {
    matchInfo = <MatchStats homeTeam={game.home_team} awayTeam={game.visiting_team} statistics={statistics} />;
  }
  // if (match_center_type === "lineup") {
    // matchInfo = <MatchLineup gameId={gameId} gameEvents={gameEvents} />;
  // }
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