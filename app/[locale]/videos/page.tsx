import Videos from './videos';
import { onFetch } from "@/utilities/fetchApi";
import { normalizeSearchParams } from '@/utilities/queryUtils';
import { SearchParamsType } from '@/types/dataTypes';
import SeasonFilter from '@/components/Filters/seasonFilter';
import PlayerFilter from '@/components/Filters/playerFilter';
import EventFilter from '@/components/Filters/eventFilter';
import config from '@/config';
import { getTranslations } from 'next-intl/server';
import TeamFilter from '@/components/Filters/teamFilter';
import { ignoredTags } from '@/utilities/utils';
import { Suspense } from 'react';
import "./videos.css";

// Highlights
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({searchParams}: {searchParams: SearchParamsType}) {

  const rawParams = await Promise.resolve(searchParams);
  const params = normalizeSearchParams(rawParams);
  const t = await getTranslations();

  const teamPlatformId = config.team;
  const currentSeason = config.availableSeasons[0]

  const [
    tagsData, 
    teamsData, 
    playersData
  ] = await Promise.all([
    onFetch("tag", undefined, { revalidate: 1200, cache: 'force-cache' }),
    !teamPlatformId ? onFetch("team", {season: currentSeason}, { revalidate: 3600, cache: 'force-cache' }) : undefined,
    teamPlatformId ? onFetch(`/team/${teamPlatformId}/active_players`, {season: currentSeason}, { revalidate: 600, cache: 'force-cache' }) : undefined,
  ])
  
  const tagsObject = tagsData?.tags || {};
  const availableTags = Object.entries(tagsObject).reduce<string[]>((acc, [key, value]) => {
    if (Array.isArray(value) && value.length > 0) acc.push(key);
    return acc;
  }, []).filter((tag) => !ignoredTags.includes(tag));

  if (config.target !== "shl") {
    if (!availableTags.includes("assist")) availableTags.push("assist");
    if (!availableTags.includes("save")) availableTags.push("save");
  }
  const teams = teamsData?.teams || [];

  const videosFilters = (
    <div className="videos-page-filters middle-container">
      <div className="videos-page-filters-inline">
        <SeasonFilter games box/>
        {!teamPlatformId && <TeamFilter teams={teams} box/>}
        <PlayerFilter playersData={playersData} box/>
      </div>
      <EventFilter availableTags={availableTags} playersData={playersData} />
    </div>
  )

  return (
    <div className="videos-main main-page">
      <div className="page-header">
        <div className="page-header-title middle-container">
          <div className="page-header-main-title">{t("videos")}</div>
          <div className="page-header-subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </div>
        </div>
      </div>
      <div className="videos-page-filters-cont">
        {videosFilters}
      </div>
      <Suspense fallback={<div className="middle-container">Loading...</div>}>
        <Videos params={params} />
      </Suspense>
    </div>
  )
}

export default Page;