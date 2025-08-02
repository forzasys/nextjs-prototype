import Image from 'next/image';
import MatchCountdown from './matchCountdown';
import { EventType, GameType } from "@/types/dataTypes";
import { getGameTime, teamStadiumName } from "@/utilities/utils";
import { getStadiumImage } from '@/utilities/imageUtil';
import { format, parseISO } from 'date-fns';
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import config from "@/config";
import "./matchScoreboard.css";

interface MatchScoreboardProps {
    game: GameType, 
    gameEvents: []
}

async function MatchScoreboard({ game, gameEvents }: MatchScoreboardProps) {

  const {home_team, visiting_team, home_team_goals, visiting_team_goals} = game

  const homeTeam = game?.home_team?.id
  const awayTeam = game?.visiting_team?.id
  const filteredEvents = gameEvents.filter((e: EventType) => e.tag.action === "goal")
  const homeFilteredEvents = filteredEvents.filter((e: EventType) => e.tag.team?.id === homeTeam)
  const awayFilteredEvents = filteredEvents.filter((e: EventType) => e.tag.team?.id === awayTeam)

  const matchIsLive = game.has_live_playlist
  const matchIsFinished = game.phase === "finished"
  const isUpcomingMatch = game.phase === "not started" && game.start_time > new Date().toISOString()
  const gameDate = format(game.date, 'EEE, dd MMM yyyy');
  const gameTime = format(parseISO(game.start_time), 'HH:mm')

  const stadiumImage = getStadiumImage[home_team.id]
  const teamStadium = teamStadiumName[home_team.id as keyof typeof teamStadiumName]

  const matchScoreboardDetails = (
    <div className='match-scoreboard-details-cont'>
      <div className="match-scoreboard-details">
            {homeFilteredEvents.map((e: EventType) => {
                const [time,] = getGameTime(e.game_time, e.game_phase);
                return (
                    <div key={e.id} className="match-scoreboard-event">
                        <div>{e.tag.scorer?.value}</div>
                        <div className="match-scoreboard-event-time">{time} &apos;</div>
                    </div>
                )
            })}
        </div>
        <div className="match-scoreboard-details away">
          {awayFilteredEvents.map((e: EventType) => {
              const [time,] = getGameTime(e.game_time, e.game_phase);
              return (
                  <div key={e.id} className="match-scoreboard-event away">
                      <div className="match-scoreboard-event-time">{time} &apos;</div>
                      <div>{e.tag.scorer?.value}</div>
                  </div>
              )
          })}
      </div>
    </div>
  )

  const matchInfo = (
    <div className='match-scoreboard-info'>
      <div className='match-scoreboard-league'>
        {config.league}
      </div>
      <div className='match-scoreboard-date-venue'>
        <div className='match-scoreboard-date'>
          <MdOutlineCalendarMonth />
          {gameDate}
        </div>
        <div className='match-scoreboard-stadium'>
          <IoLocationOutline />
          {teamStadium}
        </div>
      </div>
    </div>
  )

  const matchPhase = (
    <div className='match-scoreboard-status'>
      {matchIsLive && (
        <div className='match-scoreboard-live'>
          <div className="match-scoreboard-live-icon"></div>
          <div className="match-scoreboard-live-text">LIVE</div>
        </div>
      )}
      {matchIsFinished && (
        <div className='match-scoreboard-phase'>{game.phase}</div>
      )}
    </div>
  )

  const matchScore = (
    <div className='match-scoreboard-score-cont'>
      <div className='match-scoreboard-score'>
        {home_team_goals}
      </div>
      <div className='match-scoreboard-score-separator'>-</div>
      <div className='match-scoreboard-score'>
        {visiting_team_goals}
      </div>
    </div>
  )

  const matchTime = (
    <div className='match-scoreboard-time'>
      {gameTime}
    </div>
  )

  const matchScoreboardCenter = isUpcomingMatch ? matchTime : matchScore

  const matchScoreboard = (
    <div className='match-scoreboard'>
      <div className='match-scoreboard-team'>
        <div className='match-scoreboard-team-name'>
          {home_team.name}
        </div>
        <div className='match-scoreboard-team-logo'>
          <Image src={home_team.logo_url} alt="team logo" fill priority/>
        </div>
      </div>
      {matchScoreboardCenter}
      <div className='match-scoreboard-team away'>
        <div className='match-scoreboard-team-logo'>
          <Image src={visiting_team.logo_url} alt="team logo" fill priority/>
        </div>
        <div className='match-scoreboard-team-name'>
          {visiting_team.name}
        </div>
      </div>
    </div>
  )

  return (
    <div className="match-scoreboard-main">
      <div className="match-scoreboard-cont">
        {stadiumImage && ( 
          <Image 
            src={stadiumImage} 
            alt="stadium" 
            fill
            priority  
            className="match-scoreboard-single-img blur-in"
            data-aos="fade"
            data-aos-duration="1000"
          />
        )}
        <div className="match-scoreboard-content">
          {matchInfo}
          {matchPhase}
          {matchScoreboard}
          {matchIsFinished && matchScoreboardDetails}
          {(isUpcomingMatch && !matchIsLive) && <MatchCountdown game={game} />}
        </div>
        <div className="match-scoreboard-img-mask-left"></div>
        <div className="match-scoreboard-img-mask-right"></div>
      </div>
    </div>
  )
}

export default MatchScoreboard