export const tags = ["goal", "shot", "yellow card", "red card"] as const;
export type Tag = typeof tags[number];

export type EventQueryType = {
  all_leagues?: boolean;
  tags?: { action: Tag };
  from_date?: string;
  to_date?: string;
  min_rating?: number;
  from?: number;
  count?: number;
  [key: string]: unknown;
};


export type PlaylistType = {
  description: string;
  // other playlist props
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