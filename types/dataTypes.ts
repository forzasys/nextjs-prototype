export type TagsType = {
  action: string,
  team?: {
    id: number;
    value?: string;
  },
  player?: {
    id: number;
    value?: string;
  },
  scorer?: {
    id: number;
    value: string;
  },
  "assist by"?: {
    id: number | "" | undefined;
    value?: string;
  },
  "shot result"?: {
    value: string;
  },
  "shot type"?: {
    value: string;
  }
}

export type QueryType = {
  all_leagues?: boolean;
  asc?: boolean;
  count?: number;
  filters?: string[];
  from?: number;
  from_date?: string;
  [key: string]: unknown;
  league?: string;
  min_rating?: number;
  season?: string | number;
  tags?: TagsType[];
  team_id?: number;
  to_date?: string; 
};

// export type PlaylistQueryType = {
//   all_leagues?: boolean;
//   tags?: TagsType[];
//   from_date?: string;
//   to_date?: string;
//   min_rating?: number;
//   from?: number;
//   filters?: string[];
//   count?: number;
//   [key: string]: unknown;
// };

// export type GamesQueryType = {
//   team_id?: number,
//   season?: string,
//   from_date?: string,
//   to_date?: string,
//   count?: number,
//   asc?: boolean,
// }

export type PlaylistType = {
  date: string;
  description: string;
  duration_ms: number;
  events: EventType[];
  game: GameType;
  hd_thumbnail_url: string;
  id: string,
  thumbnail_url: string;
  video_url: string;
  // other playlist props
};

export type EventType = {
  game_phase: string;
  game_time: number;
  id: string;
  playlist: PlaylistType;
  tag: TagsType;
  tags: TagsType[];
};

export type TeamType = {
  id: number,
  logo_url: string;
  name: string;
  short_name: string;
}

export type GameType = {
  date: string;
  id: number;
  has_live_playlist: boolean;
  home_team: TeamType;
  home_team_goals: number;
  phase: string;
  start_time: string;
  visiting_team: TeamType;
  visiting_team_goals: number;
};

export type PlayerType = {
  first_name: string;
  id: number;
  last_name: string;
  name: string;
  position: string;
  position_index_from_back_right: number;
  role: string;
  shirt_number: string;
}

export type StatsPlayerType = {
  assists?: number;
  goals?: number;
  id: number;
  name: string;
  shirt_number: number;
  team_id: number;
  team_name: string;
  red_cards?: number;
  yellow_cards?: number;
}

export type TopScorerQueryType = {
  team_id?: number;
  from_date?: string;
  to_date?: string;
  league?: string;
}

export type TableType = {
  games_played: number;
  goal_difference: number;
  goals_conceded: number;
  goals: number;
  id: number;
  losses: number;
  name: string;
  points: number;
  rank: number;
  red_cards: number;
  ties: number;
  wins: number;
  yellow_cards: number;
}

export type StatisticsType = {
  corners: {
    home_team: number
    visiting_team: number
  }
  distances: {
    home_team: number
  }
  fouls_committed: {
    home_team: number
    visiting_team: number
  }
  goals: {
    home_team: number
    visiting_team: number
  }
  offsides: {
    home_team: number
    visiting_team: number
  }
  possessions: {
    home_team: number
    visiting_team: number
  }
  red_cards: {
    home_team: number
    visiting_team: number
  }
  shots_on_target: {  
    home_team: number
    visiting_team: number
  }
  total_shots: {
    home_team: number
    visiting_team: number
  }
  yellow_cards: {
    home_team: number
    visiting_team: number
  }
}

export type SearchParamsType = Record<string, string | string[] | undefined>;