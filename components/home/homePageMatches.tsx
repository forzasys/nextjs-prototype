import Link from 'next/link';
import { GameType } from '@/types/dataTypes';
import Image from 'next/image';
import { teamStadiumName } from '@/utilities/utils';
import { format, parseISO } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import config from '@/config';
import { getLeagueLogo } from '@/utilities/imageUtil';
import classNames from 'classnames';
import "./homePageMatches.css"

interface HomePageMatchesProps {
    games: GameType[]
}

function HomePageMatches({games}: HomePageMatchesProps) {

  const teamPlatformId = config.team;
  const isTeamPlatform = !!teamPlatformId;

  const t = useTranslations();
  const locale = useLocale();
  const leagueLogo = getLeagueLogo[config.league as keyof typeof getLeagueLogo]

  const homeAwayLabel = (homeTeamId: number, awayTeamId: number) => {
    if (!teamPlatformId) return null;
    if (homeTeamId === teamPlatformId) return (
      <div className='home-match-label home'>H</div>
    );
    if (awayTeamId === teamPlatformId) return (
      <div className='home-match-label away'>B</div>
    );
  }

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
        <div className="home-match-single-top">
          <div className='home-match-single-league'>
            <Image src={leagueLogo} alt="league logo" fill priority />
          </div>
          {homeAwayLabel(home_team.id, visiting_team.id)}
        </div>
        <div className="home-match-league">{stadiumName}</div>
        <div className="home-match-date">{gameDate}</div>
        <div className="home-match-time">{gameTime}</div>
        <div className="home-match-teams">
            <div className="home-match-team">
                <Image src={home_team.logo_url} alt="team logo" fill priority />
            </div>
            <div className="home-match-team">
                <Image src={visiting_team.logo_url} alt="team logo" fill priority />
            </div>
        </div>
        <div className="home-match-team-names">
          <div className="home-match-team-name">{home_team.name}</div>
          <div className="home-match-team-separator"></div>
          <div className="home-match-team-name">{visiting_team.name}</div>
        </div>
        <Link href={`/${locale}/match/${game.id}`} className="home-match-center">
            {t("match center")}
        </Link>
      </div>
    )
  })

  return (
    <div className="home-page-matches-cont">
      {/* <div className="home-page-matches-bg"></div> */}
      <div className= "home-page-matches middle-container">
        <div className="section-title">{t("next matches")}</div>
        <div className="next-matches-list">
        {gamesList}
        </div>
      </div>   
    </div>
  )
}

export default HomePageMatches