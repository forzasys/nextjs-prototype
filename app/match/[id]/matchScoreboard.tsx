import Image from 'next/image';
import { EventType, GameType } from "@/types/dataTypes";
import { getGameTime } from "@/utilities/utils";

interface MatchScoreboardProps {
    game: GameType, 
    gameEvents: []
}

async function MatchScoreboard({ game, gameEvents }: MatchScoreboardProps) {

  const homeTeam = game?.home_team?.id
  const awayTeam = game?.visiting_team?.id
  const filteredEvents = gameEvents.filter((e: EventType) => e.tag.action === "goal")
  const homeFilteredEvents = filteredEvents.filter((e: EventType) => e.tag.team?.id === homeTeam)
  const awayFilteredEvents = filteredEvents.filter((e: EventType) => e.tag.team?.id === awayTeam)

  const {home_team, visiting_team, home_team_goals, visiting_team_goals} = game

  const homeEventsRecap = (
        <div className="scoreboard-scorer-cont">
            {homeFilteredEvents.map((e: EventType) => {
                const [time,] = getGameTime(e.game_time, e.game_phase);
                return (
                    <div key={e.id} className="scoreboard-scorer">
                        <div>{e.tag.scorer?.value}</div>
                        <div className="scoreboard-scorer-time">{time}</div>
                    </div>
                )
            })}
        </div>
    )

  const awayEventsRecap = (
      <div className="scoreboard-scorer-cont">
          {awayFilteredEvents.map((e: EventType) => {
              const [time,] = getGameTime(e.game_time, e.game_phase);
              return (
                  <div key={e.id} className="scoreboard-scorer away">
                      <div>{e.tag.scorer?.value}</div>
                      <div className="scoreboard-scorer-time">{time}</div>
                  </div>
              )
          })}
      </div>
  )

  const matchHeader = (
    <div style={{display: "flex"}}>
      <div className='single-game-team-logo'>
        <Image src={home_team.logo_url} alt="team logo" width={30} height={30}/>
      </div>
      <div>{home_team.name}</div>
      <div>{home_team_goals}</div>
      <div>-</div>
      <div>{visiting_team_goals}</div>
      <div>{visiting_team.name}</div>
      <div className='single-game-team-logo'>
        <Image src={visiting_team.logo_url} alt="team logo" width={30} height={30}/>
      </div>
    </div>
  )

  return (
      <div>
          {matchHeader}
          <div style={{display: "flex"}}>
            {homeEventsRecap}
            {awayEventsRecap}
          </div>
      </div>
  )
}

export default MatchScoreboard