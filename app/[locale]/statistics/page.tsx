import StatisticsTypeFilter from '@/components/Filters/statisticsTypeFilter';
import { normalizeSearchParams } from '@/utilities/queryUtils';
import { SearchParamsType } from '@/types/dataTypes';
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

  const teamsData = await onFetch("team", {season: currentSeason})
  const tableData = await onFetch("stats/table", tableInitialQuery)

  const teams = teamsData?.teams || []
  const table = tableData?.teams || []

  if (!config.hasStatisticsPage) return (
    <div>Statistics page is not available for this league</div>
  )

  let statisticsContent = null;
  
  if (statisticTypeParam === "table" || !statisticTypeParam) {
    statisticsContent = <Table table={table} teams={teams} seasonParam={seasonParam}/>
  } else if (statisticTypeParam === "top_scorers") {
    statisticsContent = <TopScorers seasonParam={seasonParam}/>
  } else if (statisticTypeParam === "cards") {
    statisticsContent = <Cards seasonParam={seasonParam}/>  
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