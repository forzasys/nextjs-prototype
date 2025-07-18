import Link from 'next/link';
import { GameType } from '@/types/dataTypes';
import Image from 'next/image';
import config from '@/config';
import { format, parseISO } from 'date-fns';
import "./home.css"

interface HomePageMatchesProps {
    games: GameType[]
}

async function HomePageMatches({games}: HomePageMatchesProps) {

  const gamesList = games.map((game: GameType) => {
    const {home_team, visiting_team} = game
    const gameDate = format(game.date, 'EEE, dd MMM yyyy');
    const gameTime = format(parseISO(game.start_time), 'HH:mm')
    return (
      <div className="home-match-single" key={game.id}>
        <div className="home-match-date">{gameDate}</div>
        <div className="home-match-league">
          {config.league}
        </div>
        
        <div className="home-match-teams">
            <div className="home-match-team">
                <Image src={home_team.logo_url} alt="team logo" width={70} height={70}/>
                <div className="home-match-team-name">{home_team.short_name}</div>
            </div>
            <div className="home-match-time">{gameTime}</div>
            <div className="home-match-team away">
                <Image src={visiting_team.logo_url} alt="team logo" width={70} height={70}/>
                <div className="home-match-team-name">{visiting_team.short_name}</div>
            </div>
        </div>
        <Link href={`/match/${game.id}`} className="home-match-center">
            Match center
        </Link>
      </div>
    )
  })

  return (
    <div className='middle-container'>
        <div className="section-title">Next matches</div>
        <div className="next-matches-list">
          {gamesList}
        </div>
    </div>
  )
}

export default HomePageMatches