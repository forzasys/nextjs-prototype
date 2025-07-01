import React from 'react'
import { onFetch } from "@/lib/fetchApi";
import { generateGamesQueryFromParams, normalizeSearchParams, initialGamesQuery } from '@/utils/queryUtils';
import { SearchParamsType } from '@/types/dataTypes';
import Matches from './matches';
import MatchesFilters from './matchesFilters';
import Config from '@/lib/config';

// Matches
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({searchParams}: {searchParams: SearchParamsType}) {

  const rawParams = await Promise.resolve(searchParams);
  const params = normalizeSearchParams(rawParams);
  const query = generateGamesQueryFromParams(params);
  
  const initialQuery = structuredClone(initialGamesQuery)
  const isInitialQuery = JSON.stringify(query) === JSON.stringify(initialQuery)
  const isTeamPlatform = !!Config.team

  const gamesData = isInitialQuery ? await onFetch("game", initialGamesQuery) : undefined
  const teamsData = !isTeamPlatform ? await onFetch("team", {season: 2025}) : undefined;
  
  const teams = teamsData?.teams || [];

  return (
    <div>
      <h3>Fixtures & Results</h3>
      <br />
      <MatchesFilters teams={teams} isTeamPlatform={isTeamPlatform} />
      <br />
      <Matches gamesData={gamesData} isInitialQuery={isInitialQuery} />
    </div>
  )
}

export default Page