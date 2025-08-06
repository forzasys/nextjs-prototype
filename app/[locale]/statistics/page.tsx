import StatisticsTypeFilter from '@/components/Filters/statisticsTypeFilter';
import { normalizeSearchParams } from '@/utilities/queryUtils';
import { QueryType, SearchParamsType } from '@/types/dataTypes';
import { onFetch } from '@/utilities/fetchApi';
import config from '@/config';
import Table from './table'
import TopScorers from './topScorers'
import Cards from './cards'
import SeasonFilter from '@/components/Filters/seasonFilter';
import TeamFilter from '@/components/Filters/teamFilter';
import { getTranslations } from 'next-intl/server';
import "./statistics.css"
import "@/components/Filters/filters.css"

async function Page({searchParams}: {searchParams: SearchParamsType}) {

  const t = await getTranslations()
  const rawParams = await Promise.resolve(searchParams);
  const params = normalizeSearchParams(rawParams);
  const isTeamPlatform = !!config.team
  const statisticTypeParam = params.get("statistic_type");
  const seasonParam = params.get("season");

  const currentSeason = config.availableSeasons[0]
  const season = seasonParam || currentSeason

  const tableInitialQuery = {
      to_date: `${currentSeason}-12-31`,
      season: season,
  }

  const topScorerInitialQuery: QueryType = {
    from_date: `${currentSeason}-01-01`,
    to_date: `${currentSeason}-12-31`,
    count: 10,
  }

  const statsCardsInitialQuery: QueryType = {
    from_date: `${currentSeason}-01-01`,
    to_date: `${currentSeason}-12-31`,
    count: 100,
}

  // Team platform
  const teamPlatformId = config.team
  if (teamPlatformId) {
    topScorerInitialQuery.team_id = teamPlatformId
    statsCardsInitialQuery.team_id = teamPlatformId
  }

  const [
    teamsData, 
    tableData,
    topScorersData,
    topAssistsData,
    statsCardsData,
  ] = await Promise.all([  
    onFetch("team", {season: currentSeason}),
    onFetch("stats/table", tableInitialQuery),
    onFetch("stats/top/scorer", topScorerInitialQuery),
    onFetch("stats/top/assists", topScorerInitialQuery),
    onFetch("stats/top/cards", topScorerInitialQuery)
  ])

  const teams = teamsData?.teams || []
  const table = tableData?.teams || []
  const topScorers = topScorersData?.players || []
  const topAssists = topAssistsData?.players || []
  const cards = statsCardsData?.players || []

  if (!config.hasStatisticsPage) return (
    <div>Statistics page is not available for this league</div>
  )

  let statisticsContent = null;
  
  if (statisticTypeParam === "table" || !statisticTypeParam) {
    statisticsContent = <Table table={table} teams={teams} seasonParam={seasonParam}/>
  } else if (statisticTypeParam === "top_scorers") {
    statisticsContent = <TopScorers seasonParam={seasonParam} topScorers={topScorers} topAssists={topAssists}/>
  } else if (statisticTypeParam === "cards") {
    statisticsContent = <Cards seasonParam={seasonParam} cards={cards}/>  
  }

  const statisticsFilters = (
    <div className="filters-inline middle-container">
      <SeasonFilter games/>
      {!isTeamPlatform && <TeamFilter teams={teams} />}
    </div>
  )

  return (
    <div className="statistics-main main-page">
      <div className="page-header">
        <div className="page-header-title middle-container">
          <div className="page-header-main-title">
            {t("statistics")}
          </div>
          <div className="page-header-subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </div>
        </div>
      </div>
      <StatisticsTypeFilter/>
      {statisticsFilters}
      <div className="statistics-content middle-container">
        {statisticsContent}
      </div>
    </div>
  )
}

export default Page