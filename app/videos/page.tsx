import Videos from './videos';
import { onFetch } from "@/utilities/fetchApi";
import { normalizeSearchParams } from '@/utilities/queryUtils';
import { SearchParamsType } from '@/types/dataTypes';
import VideosFilters from './videosFilters';
import config from '@/config';

// Highlights
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({searchParams}: {searchParams: SearchParamsType}) {

  const rawParams = await Promise.resolve(searchParams);
  const params = normalizeSearchParams(rawParams);
  
  const teamPlatformId = config.team;
  const teamIsSelected = !!params.get("team")
  const showTeamFilter = !!teamPlatformId || teamIsSelected
  
  const tagsData = await onFetch("tag");
  const tags = tagsData?.tags || [];
  
  const teamsData = !teamPlatformId ? await onFetch("team", {season: 2025}) : undefined;
  const teams = teamsData?.teams || [];

  const playersQuery = {
    season: config.availableSeasons[0],
}

  const playersData = teamPlatformId ? await onFetch(`/team/${teamPlatformId}/active_players`, playersQuery) : undefined;
  
  return (
    <div>
      <title>Videos</title>
      <h2>Videos</h2>
      <VideosFilters 
        playersData={playersData}
        tags={tags} 
        teams={teams} 
        showTeamFilter={showTeamFilter} 
        />
      <Videos params={params} />
    </div>
  )
}

export default Page;