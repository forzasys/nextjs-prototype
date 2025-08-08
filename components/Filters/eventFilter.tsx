'use client';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { useSearchParams } from 'next/navigation';
import { PlayerType } from '@/types/dataTypes';
import config from '@/config';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import "./filters.css";
import './eventFilters.css';
import { ignoredTags } from '@/utilities/utils';

interface EventFilterProps {
  tags?: Record<string, unknown>;
  availableTags?: string[];
  playersData?: {
    active_players: {
      player: PlayerType
    }[]
  };
}

interface SingleEventProps {
  event: string;
  playerSelected: boolean;
  eventParam: string | null;
  isGoalkeeper: boolean;
}

function SingleEvent({ event, playerSelected, eventParam, isGoalkeeper }: SingleEventProps) {

  const t = useTranslations();
  const { updateParam } = useUpdateSearchParam();

  let disabled = false
  let condition = ""

  if (event === "assist") {
    disabled = !playerSelected
    if (disabled) {
    condition = "select a player to enable assist"
    }
  }

  if (event === "save") {
    disabled = !isGoalkeeper
    if (disabled) {
      condition = "select a goalkeeper to enable saves"
    }
  }

  const onSelectEvent = () => {
    if (disabled) return
    updateParam("event", event)
  }

  return (
    <div className={classNames("event-filter-item", {"selected": eventParam === event})} onClick={onSelectEvent}>
      <div className="event-filter-item-title">
        {t(event)}
      </div>
    </div>
  )
}

function EventFilter({ tags, availableTags: availableTagsProp, playersData }: EventFilterProps) {

  const searchParams = useSearchParams();
  const playerParam = searchParams.get("player");
  const teamParam = searchParams.get("team");
  const eventParam = searchParams.get("event");

  const t = useTranslations();
  const { updateMultipleParams } = useUpdateSearchParam();

  // Prefer server-provided availableTags to avoid recomputation; fall back to local calculation
  let availableTags: string[] | null = null;
  if (availableTagsProp && availableTagsProp.length > 0) {
    availableTags = availableTagsProp.slice();
  } else if (tags) {
    const allTags = Object.entries(tags).reduce<string[]>((acc, [key, value]) => {
      if (Array.isArray(value) && value.length > 0) acc.push(key);
      return acc;
    }, []);
    availableTags = allTags.filter((t) => !ignoredTags.includes(t));
    if (config.target !== "shl") {
      if (!availableTags.includes("assist")) availableTags.push("assist");
      if (!availableTags.includes("save")) availableTags.push("save");
    }
  }

  if (!availableTags || availableTags.length === 0) return null;

  const allPlayers = playersData?.active_players?.map((p) => p.player) || [];

  const selectedPlayer: PlayerType | null = !!playerParam && allPlayers.find(p => p.id === Number(playerParam)) || null
  const selectedPlayerIsGoalkeeper = !!selectedPlayer && selectedPlayer.role === "goalkeeper"

  const onSelectAllTag = () => {
    updateMultipleParams([
      { param: "event", value: undefined },
      { param: "page", value: undefined }
    ]);
  }

  const eventsOptions = (
    <div className="events-filter-options">
      <div 
        onClick={onSelectAllTag} 
        className={classNames("event-filter-item", {"selected": !eventParam})}
        >
          <div className="event-filter-item-title">{t("all")}</div>
        </div>
      {availableTags.map((t) => {
        return (
          <SingleEvent
            key={t}
            event={t}
            eventParam={eventParam}
            playerSelected={!!playerParam}
            isGoalkeeper={selectedPlayerIsGoalkeeper}
          />
        )
      })}
    </div>
  )

  return (
    <div className="events-filter middle-container">
      {eventsOptions}
    </div>
  )
}

export default EventFilter