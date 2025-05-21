import React from 'react'
import { getQueryClient } from '@/lib/reactQuery';
import { dehydrate } from '@tanstack/react-query';
import ReactQueryProvider from '@/lib/reactQueryProvider';
import { fetcher } from '@/lib/fetchApi';
import { generateEventQueryFromParams, normalizeSearchParams, SearchParamsType } from '@/utils/queryUtil';
import Home from '@/components/home/home';

// Home page
// Default home page ("/" route), this page has the same level with the Layout component
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

    return (
        <ReactQueryProvider dehydratedState={dehydratedState}>
            <Home/>
        </ReactQueryProvider>
    );
}

export default Page