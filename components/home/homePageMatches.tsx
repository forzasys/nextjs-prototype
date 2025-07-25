import Link from 'next/link';
import { GameType } from '@/types/dataTypes';
import Image from 'next/image';
import { teamStadiumName } from '@/utilities/utils';
import { format, parseISO } from 'date-fns';
// import { getLeagueLogo } from '@/utilities/imageUtil';
import "./home.css"

interface HomePageMatchesProps {
    games: GameType[]
}

function HomePageMatches({games}: HomePageMatchesProps) {

  const gamesList = games.map((game: GameType, index: number) => {
    const {home_team, visiting_team} = game
    const gameDate = format(game.date, 'EEE, dd MMM yyyy');
    const gameTime = format(parseISO(game.start_time), 'HH:mm')
    const stadiumName = teamStadiumName[home_team.id as keyof typeof teamStadiumName]
    return (
      <div 
        key={game.id}
        className="home-match-single" 
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        <div className="home-match-date">{gameDate}</div>
        <div className="home-match-league">
          {stadiumName}
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
    <div className="home-page-matches-cont">
      {/* <div className="home-page-matches-bg"></div> */}
      <div className= "home-page-matches middle-container">
        <div className="section-title">Next matches</div>
        <div className="next-matches-list">
        {gamesList}
        </div>
      </div>   
    </div>
  )
}

export default HomePageMatches