import React from 'react'
import { onFetch } from "../../lib/fetchApi";
import { generateGamesQueryFromParams, normalizeSearchParams, SearchParamsType, initialGamesQuery } from '@/utils/queryUtil';
import Games from './games';
import GamesFilters from './gamesFilters';
import { getTeams } from '../../lib/fetchApi';

// Games
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({ searchParams }: {searchParams: Promise<SearchParamsType>}) {

  const rawParams = await searchParams;
  const params = normalizeSearchParams(rawParams);
  const query = generateGamesQueryFromParams(params);

  const teams = await getTeams()
  
  const initialQuery = structuredClone(initialGamesQuery)
  const isInitialQuery = JSON.stringify(query) === JSON.stringify(initialQuery)

  const gamesData = isInitialQuery ? await onFetch("game", initialGamesQuery) : undefined
  
  return (
    <div>
      <h3>Fixtures & Results</h3>
      <br />
      <GamesFilters teams={teams}/>
      <br />
      <Games gamesData={gamesData}/>
    </div>
  )
}

export default Page