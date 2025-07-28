'use client';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import "./MatchCenterFilter.css";

interface MatchCenterFilterProps {
    defaultType?: string;
}

function MatchCenterFilter({defaultType}: MatchCenterFilterProps) {

    const {updateParam} = useUpdateSearchParam();
    const searchParams = useSearchParams();
    const matchCenterTypeParam = searchParams.get("match_center_type");
    const t = useTranslations();

    return (
        <div className="match-center-filter middle-container">
            <div 
                onClick={() => updateParam("match_center_type", "headtohead")}
                className={classNames("match-center-filter-item", {
                    "selected": matchCenterTypeParam === "headtohead" || 
                    (!matchCenterTypeParam && defaultType === "headtohead")
                })}>
                <div className="">Head to head</div>
            </div>
            <div 
                onClick={() => updateParam("match_center_type", "stats")}
                className={classNames("match-center-filter-item", {
                    "selected": matchCenterTypeParam === "stats" || 
                    (!matchCenterTypeParam && defaultType === "stats")
                })}>
                <div className="">Stats</div>
            </div>
            <div 
                onClick={() => updateParam("match_center_type", "lineup")}
                className={classNames("match-center-filter-item", {"selected": matchCenterTypeParam === "lineup"})}
                >
                <div className="">{t("lineup")}</div>
            </div>
            <div 
                onClick={() => updateParam("match_center_type", "events")}
                className={classNames("match-center-filter-item", {"selected": matchCenterTypeParam === "events"})}
                >
                <div className="">{t("events")}</div>
            </div>
        </div>
    )
}

export default MatchCenterFilter