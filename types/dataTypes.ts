export type TagsType = {
  action: string,
  team?: {
    id: number;
    value?: string;
  },
  scorer?: {
    id: number;
    value: string;
  },
  "assist by"?: {
    id: number | "" | undefined;
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
  id: string,
  description: string;
  duration_ms: number;
  game: GameType;
  hd_thumbnail_url: string;
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
  goals_difference: number;
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

export type SearchParamsType = Record<string, string | string[] | undefined>;