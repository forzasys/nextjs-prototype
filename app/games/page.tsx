import React from 'react'
import { getQueryClient } from '@/lib/reactQuery';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { fetcher } from "../../lib/fetchApi";
import { generateEventQueryFromParams, SearchParamsType, normalizeSearchParams } from '@/utils/queryUtil';
import Games from './games';

// Games
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({ searchParams }: { searchParams: Promise<SearchParamsType>}) {

  const queryClient = getQueryClient();

  const rawParams = await searchParams;
  const params = normalizeSearchParams(rawParams);
  const query = generateEventQueryFromParams(params);

  await queryClient.prefetchQuery({
    queryKey: ["games", query],
    queryFn: () => fetcher("games", query),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Games />
    </HydrationBoundary>
  )
}

export default Page