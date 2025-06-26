'use client';
import { TeamType } from '@/types/dataTypes';
import { useUpdateSearchParam } from '@/utils/ClientSideUtils';

function TeamFilter({ teams }: { teams: TeamType[] }) {

  const updateParam = useUpdateSearchParam();

  return (
    <div style={{display: "flex", gap: "15px"}}>
      <div onClick={() => updateParam("team", undefined)}>all</div>
      {teams.map((t) => {
        return (
          <div key={t.id} onClick={() => updateParam("team", t.id)}>{t.name}</div>
        )
      })}
    </div>
  )
}

export default TeamFilter