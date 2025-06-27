import SeasonFilter from '@/components/Filter/seasonFilter';
import TagFilter from '@/components/Filter/tagFilter';
import TeamFilter from '@/components/Filter/teamFilter';
import Config from '@/lib/config';
import { onFetch } from '@/lib/fetchApi';

async function VideosFilters() {

  const tagsData = await onFetch("tag");
  const tags = tagsData?.tags
  
  const teamsData = await onFetch("team", {season: 2025});
  const teams = teamsData?.teams || [];

  const isTeamPlatform = Config.team

  return (
    <div>
      <SeasonFilter />
      <br />
      <TagFilter tags={tags} />
      <br />
      {!isTeamPlatform && <TeamFilter teams={teams} />}
    </div>
  );
}

export default VideosFilters;