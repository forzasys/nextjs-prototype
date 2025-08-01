'use client';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { useSearchParams } from 'next/navigation';
import { PlayerType } from '@/types/dataTypes';
import config from '@/config';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { TbCards, TbCardsFilled } from "react-icons/tb";
import { FaHands } from "react-icons/fa6";
import { GiWhistle, GiRunningShoe } from "react-icons/gi";
import { PiSoccerBallLight } from "react-icons/pi";
import "./filters.css";
import './eventFilters.css';

interface EventFilterProps {
  tags: string[];
  playersData: {
    active_players: {
      player: PlayerType
    }[]
  }
}

interface SingleEventProps {
  event: string;
  playerSelected: boolean;
  eventParam: string | null;
  isGoalkeeper: boolean;
}

const eventIcons = {
  "assist": <GiRunningShoe />,
  "goal": <PiSoccerBallLight />,
  "penalty": <GiWhistle />,
  "red card": <TbCardsFilled />,
  "save": <FaHands />,
  "yellow card": <TbCards />,
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
      {/* <div className="event-filter-item-icon"> */}
        {/* {eventIcons[event as keyof typeof eventIcons]} */}
      {/* </div> */}
      {/* {condition && <div>{condition}</div>} */}
    </div>
  )
}

function EventFilter({ tags, playersData }: EventFilterProps) {

  const searchParams = useSearchParams();
  const playerParam = searchParams.get("player");
  const teamParam = searchParams.get("team");
  const eventParam = searchParams.get("event");

  const t = useTranslations();
  const { updateMultipleParams } = useUpdateSearchParam();

  if (tags.length === 0) return null

  const allTags = Object.entries(tags).reduce<string[]>((acc, [key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      acc.push(key);
    }
    return acc;
  }, []);

  const uselessTags = ["end phase", "corner", "free kick", "medical treatment", "misc", "offside", "start phase", "substitution", "throw-in"]
  
  const availableTags = allTags.filter((t) => !uselessTags.includes(t))
  
  if (config.target !== "shl") {
    availableTags.push("assist", "save")
  }

  const allPlayers = playersData?.active_players.map((p) => p.player)

  const selectedPlayer: PlayerType | null = !!teamParam && allPlayers?.find(t => t.id === Number(teamParam)) || null
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