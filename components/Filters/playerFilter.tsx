'use client';
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { onFetch } from '@/utilities/fetchApi';
import { PlayerFilterDropdown } from './filterDropdown';
import { useSearchParams } from 'next/navigation';
import { PlayerType } from '@/types/dataTypes';
import config from '@/config';

type ActivePlayerObjectType = {
    player: PlayerType,
}

function PlayerFilter() {

    const searchParams = useSearchParams();

    const playerParam = searchParams.get('player');
    const seasonParam = searchParams.get('season') || '2025';
    const teamParam = searchParams.get('team');
    const teamPlatformId = config.team
    const teamId = teamPlatformId || teamParam
    
    const playersQuery = {
        season: seasonParam,
    }

    const { data, isLoading } = useQuery({
        queryKey: [`/team/${teamId}/active_players`, playersQuery],
        queryFn: () => onFetch(`/team/${teamId}/active_players`, playersQuery),
        enabled: !!teamId && !!seasonParam,
        // staleTime: staleTime,
    });

    const players = data?.active_players.map((p: ActivePlayerObjectType) => p.player) || [];

    if (isLoading) {
        return <div>Loading...</div>
    }

    const playerOptions = players.map((p: PlayerType) => ({
        id: p.id,
        value: {
            name: p.name,
            shirt_number: p.shirt_number
        }
    }))

    return (
        <div>
            <PlayerFilterDropdown title="player" options={playerOptions} value={playerParam} hasAll/>
        </div>
    )
}

export default PlayerFilter