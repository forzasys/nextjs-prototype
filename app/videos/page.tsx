import Videos from './videos';
import { onFetch } from "@/lib/fetchApi";
import { normalizeSearchParams } from '@/utils/queryUtils';
import { SearchParamsType } from '@/types/dataTypes';
import VideosFilters from './videosFilters';
import Config from '@/lib/config';

// Highlights
// TODO name this function more specific or keep "Page" (Page is standard name for Next.js pages)
async function Page({searchParams}: {searchParams: SearchParamsType}) {

  const rawParams = await Promise.resolve(searchParams);
  const params = normalizeSearchParams(rawParams);
  
  const isTeamPlatform = !!Config.team;
  const teamIsSelected = !!params.get("team")

  const tagsData = await onFetch("tag");
  const tags = tagsData?.tags || [];
  
  const teamsData = !isTeamPlatform ? await onFetch("team", {season: 2025}) : undefined;
  const teams = teamsData?.teams || [];
  
  return (
    <div>
      <title>Videos</title>
      <h2>Videos</h2>
      <VideosFilters tags={tags} teams={teams} isTeamPlatform={isTeamPlatform} teamIsSelected={teamIsSelected} />
      <Videos params={params} />
    </div>
  )
}

export default Page;