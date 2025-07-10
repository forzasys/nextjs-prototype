import React from 'react'
import { onFetch } from "@/utilities/fetchApi";
import { generateGamesQueryFromParams, normalizeSearchParams, initialGamesQuery } from '@/utilities/queryUtils';
import { SearchParamsType } from '@/types/dataTypes';
import Matches from './matches';
import MatchesFilters from './matchesFilters';
import config from '@/config';

// Matches
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({searchParams}: {searchParams: SearchParamsType}) {

  const rawParams = await Promise.resolve(searchParams);
  const params = normalizeSearchParams(rawParams);
  const query = generateGamesQueryFromParams(params);
  
  const initialQuery = structuredClone(initialGamesQuery)
  const isInitialQuery = JSON.stringify(query) === JSON.stringify(initialQuery)
  const isTeamPlatform = !!config.team
  const currentSeason = config.availableSeasons[0]

  const gamesData = isInitialQuery ? await onFetch("game", initialGamesQuery) : undefined
  const teamsData = !isTeamPlatform ? await onFetch("team", {season: currentSeason}) : undefined;
  
  const teams = teamsData?.teams || [];

  return (
    <div className="matches-main main-page">
      <div className="page-header"></div>
      <div className="in-page-header middle-container">
        <div className="page-header-title">Fixtures & Results</div>
        <MatchesFilters teams={teams} isTeamPlatform={isTeamPlatform} />
        <br />
        <Matches gamesData={gamesData} isInitialQuery={isInitialQuery} />
      </div>
    </div>
  )
}

export default Page