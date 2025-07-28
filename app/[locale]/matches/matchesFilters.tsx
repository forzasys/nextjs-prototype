import React from 'react'
import MatchesTypeFilter from '@/components/Filters/matchesTypeFilter';
import SeasonFilter from '@/components/Filters/seasonFilter';
import TeamFilter from '@/components/Filters/teamFilter';
import { TeamType } from '@/types/dataTypes';
import "./matchesFilters.css";

interface MatchesFiltersProps {
  teams: TeamType[];
  isTeamPlatform: boolean;
}

async function MatchesFilters({ teams, isTeamPlatform }: MatchesFiltersProps) {


  return (
    <div className="middle-container">
      <div className="matches-filters-inline">
        <SeasonFilter games/>
        {!isTeamPlatform && <TeamFilter teams={teams} />}
      </div>
      <br />
      <br />
      <MatchesTypeFilter/>
    </div>
  )
}

export default MatchesFilters