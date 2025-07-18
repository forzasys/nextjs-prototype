import React from 'react'
import config from '@/config';
import Table from './table'
import TopScorers from './topScorers'
import Assists from './assists'
import Cards from './cards'
import classNames from 'classnames';
import "./statistics.css"

function Page() {

  if (!config.hasStatisticsPage) return (
    <div>Statistics page is not available for this league</div>
  )

  const eventsOptions = (
    <div className="statistics-filters">
      <div className={classNames("single-filter", {"selected": true})}>
          Table
      </div>
      <div className={classNames("single-filter", {"selected": false})}>
          Top Scorers & Assists
      </div>
      <div className={classNames("single-filter", {"selected": false})}>
          Cards
      </div>
      <div className="inline-filter-options-line"></div>
    </div>
  )

  return (
    <div className="statistics-main main-page">
      <div className="page-header short"></div>
      <div className="in-page-header">
        <div className="page-header-title">Statistics</div>
        <div className="middle-container">{eventsOptions}</div>
        <br />
        <br />
        <Table/>
        <br />
        <TopScorers/>
        <br />
        <Assists/>
        <br />
        <Cards/>
      </div>
    </div>
  )
}

export default Page