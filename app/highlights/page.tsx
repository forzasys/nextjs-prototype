import React from 'react'
import { getQueryClient } from '@/lib/reactQuery';
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import Highlights from './highlights';
import { fetcher } from "@/lib/fetchApi";
import { SearchParamsType, normalizeSearchParams, generateEventQueryFromParams } from '@/utils/queryUtil';

// Highlights
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({ searchParams }: { searchParams: Promise<SearchParamsType>}) {
  
  const queryClient = getQueryClient();

  const rawParams = await searchParams;
  const params = normalizeSearchParams(rawParams);
  const query = generateEventQueryFromParams(params);

  await queryClient.prefetchQuery({
    queryKey: ['events', query],
    queryFn: () => fetcher("event", query),
  });

  const dehydratedState = dehydrate(queryClient);

  // console.log("Dehydrated:", JSON.stringify(dehydratedState, null, 2));

  return (
    <HydrationBoundary state={dehydratedState}>
      <Highlights />
    </HydrationBoundary>
  );
}

export default Page;