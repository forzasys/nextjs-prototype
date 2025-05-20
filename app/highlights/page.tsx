import React from 'react'
import { getQueryClient } from '@/lib/react-query';
import { dehydrate } from '@tanstack/react-query';
import ReactQueryProvider from '@/lib/react-query-provider';
import Highlights from './highlights';
import { fetcher } from "../api/fetchApi";
import { generateEventQueryFromParams } from '../components/util/queryTypes';
import { SearchParamsType, normalizeSearchParams } from '../components/util/queryTypes';

// type searchParamProps = {
//   searchParams: Record<string, string | string[] | undefined>;
// };

// function toURLSearchParams(params: Record<string, string | undefined>): URLSearchParams {
//   const filteredEntries = Object.entries(params).filter(
//     ([, value]) => value !== undefined
//   ) as [string, string][];
//   return new URLSearchParams(filteredEntries);
// }


export default async function Page({ searchParams }: { searchParams: SearchParamsType}) {
  
  const queryClient = getQueryClient();

  const params = normalizeSearchParams(searchParams);
  const query = generateEventQueryFromParams(params);

  await queryClient.prefetchQuery({
    queryKey: ['events', query],
    queryFn: () => fetcher("event", query),
  });

  const dehydratedState = dehydrate(queryClient);

  // console.log("Dehydrated state:", JSON.stringify(dehydratedState, null, 2));

  return (
    <ReactQueryProvider dehydratedState={dehydratedState}>
      <Highlights/>
    </ReactQueryProvider>
  );
}