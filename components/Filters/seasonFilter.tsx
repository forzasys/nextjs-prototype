'use client';
import config from '@/config';
import { useSearchParams } from 'next/navigation';
import { FilterDropdown } from './filterDropdown';

interface SeasonFilterProps {
  games?: boolean
  box?: boolean
}

function SeasonFilter({games, box}: SeasonFilterProps) {

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
    <FilterDropdown 
      title="season" 
      options={seasonsOptions} 
      value={seasonParam} 
      defaultValue={currentSeason} 
      hasAll
      box={box}
    />
  )
}

export default SeasonFilter