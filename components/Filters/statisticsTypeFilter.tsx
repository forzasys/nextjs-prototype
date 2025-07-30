'use client';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import "./filters.css";

function StatisticsTypeFilter() {

    const t = useTranslations();
    const {updateParam} = useUpdateSearchParam();
    const searchParams = useSearchParams();
    const statisticsTypeParam = searchParams.get("statistic_type");

    return (
        <div className='page-tab-cont'> 
            <div className="page-tab-options middle-container">
                <div
                    onClick={() => updateParam("statistic_type", "table")} 
                    className={classNames("page-tab", {"selected": statisticsTypeParam === "table" || !statisticsTypeParam})}
                    >
                    {t("table")}
                </div>
                <div
                    onClick={() => updateParam("statistic_type", "top_scorers")} 
                    className={classNames("page-tab", {"selected": statisticsTypeParam === "top_scorers"})}
                    >
                    Top Scorers & Assists
                </div>
                <div
                    onClick={() => updateParam("statistic_type", "cards")} 
                    className={classNames("page-tab", {"selected": statisticsTypeParam === "cards"})}
                    >
                    {t("cards")}
                </div>
            </div>
        </div>
    )
}

export default StatisticsTypeFilter