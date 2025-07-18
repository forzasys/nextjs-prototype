import React from 'react'
import MatchesTypeFilter from '@/components/Filters/matchesTypeFilter';
import SeasonFilter from '@/components/Filters/seasonFilter';
import TeamFilter from '@/components/Filters/teamFilter';
import { TeamType } from '@/types/dataTypes';
interface MatchesFiltersProps {
  teams: TeamType[];
  isTeamPlatform: boolean;
}

async function MatchesFilters({ teams, isTeamPlatform }: MatchesFiltersProps) {


  return (
    <div className="middle-container">
      <SeasonFilter games/>
      <br />
      <br />
      <MatchesTypeFilter/>
      {!isTeamPlatform && <TeamFilter teams={teams} />}
    </div>
  )
}

export default MatchesFilters