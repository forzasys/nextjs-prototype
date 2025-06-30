import SeasonFilter from '@/components/Filters/seasonFilter';
import TagFilter from '@/components/Filters/tagFilter';
import TeamFilter from '@/components/Filters/teamFilter';
import { TeamType } from '@/types/dataTypes';
import PlayerFilter from '@/components/Filters/playerFilter';

interface VideosFiltersProps {
  tags: string[];
  teams: TeamType[];
  isTeamPlatform: boolean;
  teamIsSelected: boolean;
}

function VideosFilters({ tags, teams, isTeamPlatform, teamIsSelected }: VideosFiltersProps) {
  return (
    <div>
      <SeasonFilter />
      <br />
      <TagFilter tags={tags} />
      <br />
      {!isTeamPlatform && <TeamFilter teams={teams} />}
      <br />
      {teamIsSelected && <PlayerFilter />}
    </div>
  );
}

export default VideosFilters;