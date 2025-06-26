'use client';
import { useUpdateSearchParam } from "@/utils/ClientSideUtils";
import Config from "@/lib/config";
import { useSearchParams } from 'next/navigation';

function SeasonFilter({games}: {games?: boolean}) {

  const updateParam = useUpdateSearchParam();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("match_type");

  const currentSeason = Config.availableSeasons[0]
  
  let seasons = Config.availableSeasons;
  
  const isGameFixtures = games && (typeParam === "fixtures" || !typeParam);
  if (isGameFixtures) seasons = [currentSeason];
  
  return (
    <div style={{display: "flex", gap: "15px"}}>
      {seasons.map((s) => {
        let season: string | undefined = s
        if (season === currentSeason) season = undefined
        return (
          <div key={s} onClick={() => updateParam("season", season)}>{s}</div>
        )
      })}
    </div>
  )
}

export default SeasonFilter