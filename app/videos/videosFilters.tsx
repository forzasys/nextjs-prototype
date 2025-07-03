import SeasonFilter from '@/components/Filters/seasonFilter';
import TagFilter from '@/components/Filters/tagFilter';
import TeamFilter from '@/components/Filters/teamFilter';
import { TeamType } from '@/types/dataTypes';
import PlayerFilter from '@/components/Filters/playerFilter';
import './videos.css';

interface VideosFiltersProps {
  tags: string[];
  teams: TeamType[];
  isTeamPlatform: boolean;
  showTeamFilter: boolean;
}

function VideosFilters({ tags, teams, isTeamPlatform, showTeamFilter }: VideosFiltersProps) {
  return (
    <div className="videos-filters">
      <SeasonFilter />
      <br />
      <TagFilter tags={tags} />
      <br />
      {!isTeamPlatform && <TeamFilter teams={teams} />}
      <br />
      {showTeamFilter && <PlayerFilter />}
    </div>
  );
}

export default VideosFilters;