import SeasonFilter from '@/components/Filter/seasonFilter';
import TagFilter from '@/components/Filter/tagFilter';
import TeamFilter from '@/components/Filter/teamFilter';
import { onFetch } from '@/lib/fetchApi';

async function VideosFilters() {

  const tagsData = await onFetch("tag");
  const tags = tagsData?.tags
  
  const teamsData = await onFetch("team", {season: 2025});
  const teams = teamsData?.teams || [];

  return (
    <>
      <SeasonFilter />
      <TagFilter tags={tags} />
      <TeamFilter teams={teams} />
    </>
  );
}

export default VideosFilters;