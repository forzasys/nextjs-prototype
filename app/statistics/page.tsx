import React from 'react'
import config from '@/config';
import Table from './table'
import TopScorers from './topScorers'
import Assists from './assists'
import Cards from './cards'

function Page() {

  console.log(process.env.NEXT_PUBLIC_TARGET)

  if (!config.hasStatisticsPage) return (
    <div>Statistics page is not available for this league</div>
  )

  return (
    <div>
      <div>Statistics</div>
      <br />
      <Table/>
      <br />
      <TopScorers/>
      <br />
      <Assists/>
      <br />
      <Cards/>
    </div>
  )
}

export default Page