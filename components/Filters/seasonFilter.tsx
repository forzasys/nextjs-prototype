'use client';
import { useUpdateSearchParam } from "@/utils/ClientSideUtils";
import config from '@/config';
import { useSearchParams } from 'next/navigation';

function SeasonFilter({games}: {games?: boolean}) {

  const updateParam = useUpdateSearchParam();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("match_type");

  const currentSeason = config.availableSeasons[0]
  
  let seasons = config.availableSeasons;
  
  const isGameFixtures = games && (typeParam === "fixtures" || !typeParam);
  if (isGameFixtures) seasons = [currentSeason];
  
  return (
    <div style={{display: "flex", gap: "15px"}}>
      <div onClick={() => updateParam("season")}>All</div>
      {seasons.map((s) => {
        return (
          <div key={s} onClick={() => updateParam("season", s)}>{s}</div>
        )
      })}
    </div>
  )
}

export default SeasonFilter