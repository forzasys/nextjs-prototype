'use client';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';

function MatchesTypeFilter() {
    
    const updateParam = useUpdateSearchParam();

    return (
        <div style={{display: "flex", gap: "15px"}}>
            <div onClick={() => updateParam("match_type", "fixtures")}>Fixtures</div>
            <div onClick={() => updateParam("match_type", "results")}>Results</div>
        </div>
    )
}

export default MatchesTypeFilter