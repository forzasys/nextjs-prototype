'use client';
import { useUpdateSearchParam } from '@/utilities/ClientSideUtils';
import { useSearchParams } from 'next/navigation';
import { PlayerType } from '@/types/dataTypes';
import config from '@/config';
import classNames from 'classnames';
import './filters.css';

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

function SingleEvent({ event, playerSelected, eventParam, isGoalkeeper }: SingleEventProps) {

  const updateParam = useUpdateSearchParam();

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
    <div className={classNames("single-option", {"selected": eventParam === event})} onClick={onSelectEvent}>
      <div>{event}</div>
      {/* {condition && <div>{condition}</div>} */}
    </div>
  )
}

function EventFilter({ tags, playersData }: EventFilterProps) {

  const searchParams = useSearchParams();
  const playerParam = searchParams.get("player");
  const teamParam = searchParams.get("team");
  const eventParam = searchParams.get("event");

  const updateParam = useUpdateSearchParam();

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

  const eventsOptions = (
    <div className="inline-filter-options-cont">
      <div className="inline-filter-options">
        <div 
          onClick={() => updateParam("event", undefined)} 
          className={classNames("single-option", {"selected": !eventParam})}
          >
            All
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
      <div className="inline-filter-options-line"></div>
    </div> 
  )

  return eventsOptions
}

export default EventFilter