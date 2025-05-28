import React from 'react'
import Highlights from './highlights';
import { fetcher } from "@/lib/fetchApi";
import { EventQueryType } from '@/types/dataTypes';
import { SearchParamsType, normalizeSearchParams, generateEventQueryFromParams } from '@/utils/queryUtil';

// Highlights
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({ searchParams }: { searchParams: Promise<SearchParamsType>}) {

  const rawParams = await searchParams;
  const params = normalizeSearchParams(rawParams);
  const query = generateEventQueryFromParams(params);

  const initialQuery: EventQueryType = {
    from_date: `2025-01-01T00:00:00.000Z`,
    to_date: `2026-01-01T00:00:00.000Z`,
    count: 10,
    from: 0,
  };

  const isInitialQuery = JSON.stringify(query) === JSON.stringify(initialQuery)

  const eventsData = isInitialQuery ? await fetcher("event", query) : undefined

  return (
    <div>
      <title>Highlights</title>
      <h2>Highlights</h2>
      <Highlights eventsData={eventsData}/>
    </div>
  );
}

export default Page;