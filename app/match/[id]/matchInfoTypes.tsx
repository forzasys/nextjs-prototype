'use client';
import React from 'react'
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';

function MatchInfoTypes() {

    const updateParam = useUpdateSearchParam();

    const onUpdateType = (type: string | undefined) => {
        updateParam("match_info", type)
    }

    return (
        <div style={{display: "flex", gap: "10px"}}>
            <div onClick={() => onUpdateType("headtohead")}>
                Head to head
            </div>
            <div onClick={() => onUpdateType("stats")}>
                Stats
            </div>
            <div onClick={() => onUpdateType("lineup")}>
                Lineup
            </div>
            <div onClick={() => onUpdateType("events")}>
                Events
            </div>
        </div>
    )
}

export default MatchInfoTypes