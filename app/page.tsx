import React from 'react'
import { fetcher } from '@/lib/fetchApi';
import Home from '@/components/home/home';
import { EventQueryType } from '@/types/dataTypes';

// Home page
// Default home page ("/" route), this page has the same level with the Layout component
async function Page() {
    
    const query: EventQueryType = {
        tags: { action: "goal" },
        count: 10,
    };

    const latestGoalsData = await fetcher("event", query);
    const latestGoals = latestGoalsData?.events || [];

    return (
        <Home latestGoals={latestGoals}/>
    );
}

export default Page