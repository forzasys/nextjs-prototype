import React from 'react'
import { getQueryClient } from '@/lib/react-query';
import { dehydrate } from '@tanstack/react-query';
import ReactQueryProvider from '@/lib/react-query-provider';
import { fetcher } from '../api/fetchApi';
import { generateEventQueryFromParams } from '../components/util/queryTypes';
import Home from './home';

async function HomeWrapper({ searchParams }: { searchParams: URLSearchParams }) {
  
    const queryClient = getQueryClient();

    const query = generateEventQueryFromParams(searchParams);

    await queryClient.prefetchQuery({
        queryKey: ['events', query],
        queryFn: () => fetcher("event", query),
    });

    const dehydratedState = dehydrate(queryClient);

    console.log("Dehydrated state:", JSON.stringify(dehydratedState, null, 2));

    return (
        <ReactQueryProvider dehydratedState={dehydratedState}>
            <Home/>
        </ReactQueryProvider>
    );
}

export default HomeWrapper