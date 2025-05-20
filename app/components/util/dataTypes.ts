export type PlaylistType = {
  description: string;
  // other playlist fields if needed
};

export type EventType = {
  id: string;
  playlist: PlaylistType;
};

export type TeamType = {
  logo_url: string;
  name: string;
}

export type GameType = {
  id: number;
  home_team: TeamType;
  visiting_team: TeamType;
  home_team_goals: number;
  visiting_team_goals: number;
};