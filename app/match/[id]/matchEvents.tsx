import React from 'react'
import { EventType } from '@/types/dataTypes';

async function MatchEvents({ gameEvents } : { gameEvents: [] }) {

    return (
        <div>
            <div>Match events</div>
            <div>
                {gameEvents.map((e: EventType) => {
                    return (
                        <div key={e.id}>{e.playlist.description}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default MatchEvents