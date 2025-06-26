import React from 'react'
import { onFetch } from '@/lib/fetchApi';
import SeasonFilter from '@/components/Filter/seasonFilter';
import TeamFilter from '@/components/Filter/teamFilter';
import MatchesTypeFilter from '@/components/Filter/gamesTypeFilter';

async function MatchesFilters() {
  
  const teamsData = await onFetch("team", {season: 2025});
  const teams = teamsData?.teams || [];

  return (
    <div>
        <MatchesTypeFilter/>
        <br />
        <SeasonFilter games/>
        <br />
        <TeamFilter teams={teams} />
    </div>
  )
}

export default MatchesFilters