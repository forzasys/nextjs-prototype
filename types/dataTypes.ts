type TagsType = {
  action: string,
  team?: {
    id: number
  },
}

export type PlaylistQueryType = {
  all_leagues?: boolean;
  tags?: TagsType[];
  from_date?: string;
  to_date?: string;
  min_rating?: number;
  from?: number;
  count?: number;
  [key: string]: unknown;
};

export type GamesQueryType = {
  team_id?: number,
  season?: string,
  from_date?: string,
  to_date?: string,
  asc?: boolean
}

export type PlaylistType = {
  id: string,
  description: string;
  // other playlist props
};

export type EventType = {
  id: string;
  playlist: PlaylistType;
};

export type TeamType = {
  id: number,
  logo_url: string;
  name: string;
  short_name: string;
}

export type GameType = {
  id: number;
  home_team: TeamType;
  visiting_team: TeamType;
  home_team_goals: number;
  visiting_team_goals: number;
};