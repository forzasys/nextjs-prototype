'use client';
import { useUpdateSearchParam } from '@/utils/ClientSideUtil';

function GamesTypeFilter() {
    
    const updateParam = useUpdateSearchParam();

    return (
        <div style={{display: "flex", gap: "15px"}}>
            <div onClick={() => updateParam("game_type", "fixtures")}>Fixtures</div>
            <div onClick={() => updateParam("game_type", "results")}>Results</div>
        </div>
    )
}

export default GamesTypeFilter