'use client';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import "./filters.css";
import { useTranslations } from 'next-intl';

function MatchesTypeFilter() {

    const t = useTranslations();
    const {updateParam} = useUpdateSearchParam();
    const searchParams = useSearchParams();
    const matchTypeParam = searchParams.get("match_type");

    return (
        <div className='page-tab-cont'>
            <div className="page-tab-options middle-container">
                <div 
                    onClick={() => updateParam("match_type", "fixtures")} 
                    className={classNames("page-tab", {
                        "selected": matchTypeParam === "fixtures" || !matchTypeParam
                    })}>
                    <div className="page-tab-title">{t("fixtures")}</div>
                </div>
                <div 
                    onClick={() => updateParam("match_type", "results")} 
                    className={classNames("page-tab", {
                        "selected": matchTypeParam === "results",
                        "disabled": !matchTypeParam
                    })}>
                    <div className="page-tab-title">{t("results")}</div>
                </div>
            </div>
        </div>
    )
}

export default MatchesTypeFilter