import React from 'react'
import { EventType } from '@/types/dataTypes';
import Playlist from '@/components/playlist/playlist';

async function MatchEvents({ gameEvents } : { gameEvents: [] }) {

    if (gameEvents.length === 0) return (
        <div>No events found</div>
    )

    return (
        <div>
            <div>Match events</div>
            <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                {gameEvents.map((e: EventType) => {
                    if (!e.playlist) {
                        return <div key={e.id}>{e.tag.action}</div>
                    } else return (
                        <Playlist key={e.id} playlist={e.playlist} />
                    )
                })}
            </div>
        </div>
    )
}

export default MatchEvents