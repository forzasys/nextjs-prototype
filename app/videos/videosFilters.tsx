import SeasonFilter from '@/components/Filters/seasonFilter';
import EventFilter from '@/components/Filters/eventFilter';
import TeamFilter from '@/components/Filters/teamFilter';
import { TeamType, PlayerType } from '@/types/dataTypes';
import PlayerFilter from '@/components/Filters/playerFilter';
import config from '@/config';
import './videos.css';

interface VideosFiltersProps {
  playersData: {
    active_players: {
      player: PlayerType
    }[]
  };
  tags: string[];
  teams: TeamType[];
  showTeamFilter: boolean;
}

function VideosFilters({ playersData, tags, teams, showTeamFilter }: VideosFiltersProps) {

  const isTeamPlatform = !!config.team;

  return (
    <div className="videos-filters">
      <div className="videos-filters-inline">
        <SeasonFilter />
        <br />
        {!isTeamPlatform && <TeamFilter teams={teams} />}
        <br />
        {showTeamFilter && <PlayerFilter playersData={playersData} />}
        <br />
      </div>
      <EventFilter tags={tags} playersData={playersData} />
    </div>
    
    
    
    
    
    
    
  );
}

export default VideosFilters;