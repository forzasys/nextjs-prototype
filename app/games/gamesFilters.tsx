import React from 'react'
import { TeamType } from '@/types/dataTypes'
import SeasonFilter from '@/components/Filter/seasonFilter';
import TeamFilter from '@/components/Filter/teamFilter';
import GamesTypeFilter from '@/components/Filter/gamesTypeFilter';

function GamesFilters({ teams }: { teams: TeamType[] }) {
  return (
    <div>
        <GamesTypeFilter/>
        <br />
        <SeasonFilter games/>
        <br />
        <TeamFilter teams={teams} />
    </div>
  )
}

export default GamesFilters