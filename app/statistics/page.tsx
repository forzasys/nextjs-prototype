import StatisticsTypeFilter from '@/components/Filters/statisticsTypeFilter';
import { normalizeSearchParams } from '@/utilities/queryUtils';
import { SearchParamsType } from '@/types/dataTypes';
import config from '@/config';
import Table from './table'
import TopScorers from './topScorers'
import Assists from './assists'
import Cards from './cards'
import "./statistics.css"

async function Page({searchParams}: {searchParams: SearchParamsType}) {

  const rawParams = await Promise.resolve(searchParams);
  const params = normalizeSearchParams(rawParams);

  const statisticTypeParam = params.get("statistic_type");
  console.log(statisticTypeParam);

  if (!config.hasStatisticsPage) return (
    <div>Statistics page is not available for this league</div>
  )

  let statisticsContent = null;
  
  if (statisticTypeParam === "table") {
    statisticsContent = <Table/>
  } else if (statisticTypeParam === "top_scorers") {
    statisticsContent = <TopScorers/>
  } else if (statisticTypeParam === "cards") {
    statisticsContent = <Cards/>  
  }

  return (
    <div className="statistics-main main-page">
      <div className="page-header">
        <div className="page-header-title">Statistics</div>
        <StatisticsTypeFilter/>
      </div>
      <div className="statistics-content middle-container">
        {statisticsContent}
      </div>
    </div>
  )
}

export default Page