'use client';
import { useEffect, useRef } from 'react';
import { TeamType } from '@/types/dataTypes';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { useSearchParams } from 'next/navigation';
import { FilterDropdown } from './filterDropdown';

function TeamFilter({ teams }: { teams: TeamType[] }) {

  const {updateParam} = useUpdateSearchParam();
  const searchParams = useSearchParams();
  const teamParam = searchParams.get("team");
  const playerParam = searchParams.get("player");
  const prevTeamRef = useRef(teamParam);
  
  useEffect(() => {
    // Only clear player if team has changed (not on initial render)
    if (prevTeamRef.current !== teamParam && prevTeamRef.current !== null && playerParam) {
      updateParam("player", undefined);
    }
    prevTeamRef.current = teamParam;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamParam])

  const teamOptions = teams.map((t) => ({
    id: t.id,
    value: t.name
  }))

  return (
    <div>
      <FilterDropdown title="team" options={teamOptions} value={teamParam} hasAll={true}/>
    </div>
  )
}

export default TeamFilter