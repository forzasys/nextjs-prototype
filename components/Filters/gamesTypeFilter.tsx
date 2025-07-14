'use client';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import "./filters.css";

function MatchesTypeFilter() {
    
    const updateParam = useUpdateSearchParam();
    const searchParams = useSearchParams();
    const matchTypeParam = searchParams.get("match_type");

    return (
        <div className="inline-filter-options">
            <div 
                onClick={() => updateParam("match_type", "fixtures")} 
                className={classNames("single-option", {
                    "selected": matchTypeParam === "fixtures" || !matchTypeParam
                })}>
                Fixtures
            </div>
            <div 
                onClick={() => updateParam("match_type", "results")} 
                className={classNames("single-option", {
                    "selected": matchTypeParam === "results",
                    "disabled": !matchTypeParam
                })}>
                Results
            </div>
            <div className="inline-filter-options-line"></div>
        </div>
    )
}

export default MatchesTypeFilter