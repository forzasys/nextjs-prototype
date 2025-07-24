import Videos from './videos';
import { onFetch } from "@/utilities/fetchApi";
import { normalizeSearchParams } from '@/utilities/queryUtils';
import { SearchParamsType } from '@/types/dataTypes';
import VideosFilters from './videosFilters';
import config from '@/config';
import "./videos.css";

// Highlights
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({searchParams}: {searchParams: SearchParamsType}) {

  const rawParams = await Promise.resolve(searchParams);
  const params = normalizeSearchParams(rawParams);
  
  const teamPlatformId = config.team;
  const currentSeason = config.availableSeasons[0]
  
  const tagsData = await onFetch("tag");
  const tags = tagsData?.tags || [];
  
  const teamsData = !teamPlatformId ? await onFetch("team", {season: currentSeason}) : undefined;
  const teams = teamsData?.teams || [];

  const playersQuery = {
    season: config.availableSeasons[0],
  }

  const playersData = teamPlatformId ? await onFetch(`/team/${teamPlatformId}/active_players`, playersQuery) : undefined;

  return (
    <div className="videos-main main-page">
      <div className="page-header">
        <div className="page-header-title">
          <div className="page-header-main-title">
            Videos
          </div>
          <div className="page-header-subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </div>
        </div>
        <VideosFilters 
          playersData={playersData}
          tags={tags} 
          teams={teams} 
        />
      </div>
      <Videos params={params} />
    </div>
  )
}

export default Page;