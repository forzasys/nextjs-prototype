import SeasonFilter from '@/components/Filter/seasonFilter';
import TagFilter from '@/components/Filter/tagFilter';
import TeamFilter from '@/components/Filter/teamFilter';
import { TeamType } from '@/types/dataTypes';

function HighlightsFilters({ tags, teams }: { tags: string[], teams: TeamType[] }) {

  return (
    <>
      <SeasonFilter />
      <TagFilter tags={tags} />
      <TeamFilter teams={teams} />
    </>
  );
}

export default HighlightsFilters;