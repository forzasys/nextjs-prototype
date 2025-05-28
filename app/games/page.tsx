import React from 'react'
import { fetcher } from "../../lib/fetchApi";
import { generateEventQueryFromParams, normalizeSearchParams } from '@/utils/queryUtil';
import { SearchParamsType } from '@/utils/queryUtil';
import Games from './games';

// Games
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({ searchParams }: {searchParams: Promise<SearchParamsType>}) {

  const rawParams = await searchParams;
  const params = normalizeSearchParams(rawParams);
  const query = generateEventQueryFromParams(params);

  const gamesData = await fetcher("game", query)
  const games = gamesData?.games || [];

  return (
    <div>
      <h3>Games</h3>
      <br />
      <Games games={games}/>
    </div>
  )
}

export default Page