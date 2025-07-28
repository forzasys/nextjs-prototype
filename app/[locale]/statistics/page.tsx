import StatisticsTypeFilter from '@/components/Filters/statisticsTypeFilter';
import { normalizeSearchParams } from '@/utilities/queryUtils';
import { SearchParamsType } from '@/types/dataTypes';
import config from '@/config';
import Table from './table'
import TopScorers from './topScorers'
import Cards from './cards'
import "./statistics.css"
import { onFetch } from '@/utilities/fetchApi';

async function Page({searchParams}: {searchParams: SearchParamsType}) {

  const rawParams = await Promise.resolve(searchParams);
  const params = normalizeSearchParams(rawParams);

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

  return (
    <div className="statistics-main main-page">
      <div className="page-header">
        <div className="page-header-title">
          <div className="page-header-main-title">
            Statistics
          </div>
          <div className="page-header-subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </div>
        </div>
        <StatisticsTypeFilter/>
      </div>
      <div className="statistics-content middle-container">
        {statisticsContent}
      </div>
    </div>
  )
}

export default Page