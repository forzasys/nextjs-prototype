'use client';
import { useEffect, useRef } from 'react';
import { TeamType } from '@/types/dataTypes';
import { useUpdateSearchParam } from '@/utils/ClientSideUtils';
import { useSearchParams } from 'next/navigation';

function TeamFilter({ teams }: { teams: TeamType[] }) {

  const updateParam = useUpdateSearchParam();
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

  return (
    <div style={{display: "flex", gap: "15px"}}>
      <div onClick={() => updateParam("team")}>all</div>
      {teams.map((t) => {
        return (
          <div key={t.id} onClick={() => updateParam("team", t.id)}>{t.name}</div>
        )
      })}
    </div>
  )
}

export default TeamFilter