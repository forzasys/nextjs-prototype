'use client';
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/lib/fetchApi';
import { useUpdateSearchParam } from '@/utils/ClientSideUtils';
import { useSearchParams } from 'next/navigation';
import { PlayerType } from '@/types/dataTypes';

type ActivePlayerObjectType = {
    player: PlayerType,
}

function PlayerFilter() {
    const searchParams = useSearchParams();
    const updateParam = useUpdateSearchParam();
    
    // Get team and season from URL params
    const teamParam = searchParams.get('team');
    const seasonParam = searchParams.get('season') || '2025';

    const playersQuery = {
        season: seasonParam,
    }

    const { data, isLoading } = useQuery({
        queryKey: [`/team/${teamParam}/active_players`, playersQuery],
        queryFn: () => onFetch(`/team/${teamParam}/active_players`, playersQuery),
        enabled: !!teamParam && !!seasonParam,
        // staleTime: staleTime,
    });

    const players = data?.active_players.map((p: ActivePlayerObjectType) => p.player) || [];

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div>Players</div>
            {players.map((player: PlayerType) => (
                <div key={player.id} onClick={() => updateParam("player", player.id)}>
                    {player.shirt_number} {player.name}
                </div>
            ))}
        </div>
    )
}

export default PlayerFilter