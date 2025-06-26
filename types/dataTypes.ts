export type TagsType = {
  action: string,
  team?: {
    id: number;
    value?: string;
  },
  scorer?: {
    id: number;
    value: string;
  }
}

export type PlaylistQueryType = {
  all_leagues?: boolean;
  tags?: TagsType[];
  from_date?: string;
  to_date?: string;
  min_rating?: number;
  from?: number;
  filters?: string[];
  count?: number;
  [key: string]: unknown;
};

export type GamesQueryType = {
  team_id?: number,
  season?: string,
  from_date?: string,
  to_date?: string,
  count?: number,
  asc?: boolean
}

export type PlaylistType = {
  id: string,
  description: string;
  // other playlist props
};

export type EventType = {
  game_phase: string;
  game_time: number;
  id: string;
  playlist: PlaylistType;
  tag: TagsType;
};

export type TeamType = {
  id: number,
  logo_url: string;
  name: string;
  short_name: string;
}

export type PlayerType = {
  first_name: string;
  id: number;
  last_name: string;
  name: string;
  position: string;
  position_index_from_back_right: number;
  shirt_number: string;
}

export type GameType = {
  id: number;
  home_team: TeamType;
  visiting_team: TeamType;
  home_team_goals: number;
  visiting_team_goals: number;
};

export type TopScorerType = {
  goals: number;
  id: number;
  name: string;
  shirt_number: number;
  team_id: number;
  team_name: string;
}

export type TopScorerQueryType = {
  team_id?: number;
  from_date?: string;
  to_date?: string;
  league?: string;
}