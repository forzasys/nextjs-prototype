import Videos from './videos';
import { onFetch } from "@/utilities/fetchApi";
import { normalizeSearchParams } from '@/utilities/queryUtils';
import { SearchParamsType } from '@/types/dataTypes';
import SeasonFilter from '@/components/Filters/seasonFilter';
import PlayerFilter from '@/components/Filters/playerFilter';
import EventFilter from '@/components/Filters/eventFilter';
import config from '@/config';
import { getTranslations } from 'next-intl/server';
import "./videos.css";
import TeamFilter from '@/components/Filters/teamFilter';

// Highlights
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({searchParams}: {searchParams: SearchParamsType}) {

  const rawParams = await Promise.resolve(searchParams);
  const params = normalizeSearchParams(rawParams);
  const t = await getTranslations();

  const teamPlatformId = config.team;
  const currentSeason = config.availableSeasons[0]

  const [tagsData, teamsData, playersData] = await Promise.all([
    onFetch("tag"),
    !teamPlatformId ? onFetch("team", {season: currentSeason}) : undefined,
    teamPlatformId ? onFetch(`/team/${teamPlatformId}/active_players`, {season: currentSeason}) : undefined,
  ])
  
  const tags = tagsData?.tags || [];
  const teams = teamsData?.teams || [];

  const videosFilters = (
    <div className="filters-inline start middle-container">
      <SeasonFilter games/>
      {!teamPlatformId && <TeamFilter teams={teams} />}
      <PlayerFilter playersData={playersData} />
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
      {videosFilters}
      <EventFilter tags={tags} playersData={playersData} />
      <Videos params={params} />
    </div>
  )
}

export default Page;