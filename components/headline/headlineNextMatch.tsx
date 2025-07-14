"use client"
import { GameType } from "@/types/dataTypes"
import Image from "next/image"
import { useCountDown } from "@/utilities/ClientSideUtils"

interface HeadlineNextMatchProps {  
    game: GameType
    translate: string
}

function HeadlineNextMatch({translate, game}: HeadlineNextMatchProps) {

    const countdown = useCountDown(game.start_time)

    if (!game || !countdown) return null

    const {home_team, visiting_team} = game

    const {days, hours, minutes, seconds} = countdown

    const NextMatchCountdown = (
        <div>
            <div>Next match in</div>
            <div>{days}d {hours}h {minutes}m {seconds}s</div>
        </div>
    )

    const nextMatch = (
      <div style={{display: "flex"}} className='single-game'>
          <div>
              <Image src={home_team.logo_url} alt="team logo" width={30} height={30}/>
          </div>
          <div>{home_team.name}</div>
          <div>-</div>
          <div>{visiting_team.name}</div>
          <div>
              <Image src={visiting_team.logo_url} alt="team logo" width={30} height={30}/>
          </div>
      </div>
    )

    return (
        <div style={{transform: `translate(${translate})`}} className="headline-single">
            {nextMatch}
            {NextMatchCountdown}
        </div>
    )
}

export default HeadlineNextMatch