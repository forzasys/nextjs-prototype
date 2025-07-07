'use client';
import config from '@/config';
import { useSearchParams } from 'next/navigation';
import { FilterDropdown } from './filterDropdown';

function SeasonFilter({games}: {games?: boolean}) {

  const searchParams = useSearchParams();
  const seasonParam = searchParams.get("season");
  const typeParam = searchParams.get("match_type");

  const currentSeason = config.availableSeasons[0]
  
  let seasons = config.availableSeasons;
  
  const isGameFixtures = games && (typeParam === "fixtures" || !typeParam);
  if (isGameFixtures) seasons = [currentSeason];
  
  const seasonsOptions = seasons.map((s) => ({
    id: s,
    value: s
  }))

  return (
    <div>
      <FilterDropdown title="season" options={seasonsOptions} value={seasonParam} defaultValue={currentSeason} hasAll/>
    </div>
  )
}

export default SeasonFilter