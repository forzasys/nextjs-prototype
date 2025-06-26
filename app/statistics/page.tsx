import React from 'react'
import Config from '@/lib/config'

function Page() {

  console.log(process.env.NEXT_PUBLIC_TARGET)

  if (!Config.hasStatisticsPage) return (
    <div>Statistics page is not available for this league</div>
  )

  return (
    <div>Statistics</div>
  )
}

export default Page