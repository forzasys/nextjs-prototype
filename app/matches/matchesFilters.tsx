import React from 'react'
import { onFetch } from '@/lib/fetchApi';
import SeasonFilter from '@/components/Filter/seasonFilter';
import TeamFilter from '@/components/Filter/teamFilter';
import MatchesTypeFilter from '@/components/Filter/gamesTypeFilter';
import Config from '@/lib/config';

async function MatchesFilters() {
  
  const teamsData = await onFetch("team", {season: 2025});
  const teams = teamsData?.teams || [];

  const isTeamPlatform = Config.team

  return (
    <div>
        <MatchesTypeFilter/>
        <br />
        <SeasonFilter games/>
        <br />
        {!isTeamPlatform && <TeamFilter teams={teams}/>}
    </div>
  )
}

export default MatchesFilters