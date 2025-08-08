"use client"
import Image from 'next/image'
import { PlaylistType, QueryType } from '@/types/dataTypes'
import { format } from 'date-fns'
import { formatDuration, getTeamBaseColor, saveQueryToSession } from '@/utilities/utils'
import { useLocale, useTranslations } from 'next-intl'
import config from '@/config'
import { useRouter } from 'next/navigation'
import { useDragToScroll } from '@/utilities/ClientSideUtils'
import "./homePageHighlights.css"

interface HomeLatestHighlightsProps {
    highlights: PlaylistType[]
    highlightsQuery: QueryType
}

function HomeLatestHighlights({highlights, highlightsQuery}: HomeLatestHighlightsProps) {

    const router = useRouter()
    const t = useTranslations();
    const locale = useLocale();
    const league = config.league

    const {
        containerRef: listRef,
        onPointerDown,
        onPointerMove,
        onPointerUp: endPointerDrag,
        onPointerCancel,
        onPointerLeave,
        onClickCapture,
    } = useDragToScroll<HTMLDivElement>({
        pointerType: 'mouse',
        clickPreventThreshold: 3,
        snap: true,
        snapSelector: '.latest-single',
        snapBehavior: 'smooth',
        snapAlignment: 'start',
    });

    const latestHighlights = highlights
        .filter((h) => h.game)
        .slice(0, 4)

    const onClickVideo = (playlistId: string) => {
        if (highlightsQuery) {
            saveQueryToSession({playlistId: playlistId, query: highlightsQuery})
        }
        router.push(`/${locale}/video/${playlistId}`)
    }

    const latestHighlightsList = latestHighlights.map((h) => {

        const game = h.game
        const {home_team, visiting_team} = game
        const homeTeamColor = getTeamBaseColor[league as keyof typeof getTeamBaseColor][game.home_team.id]
        const awayTeamColor = getTeamBaseColor[league as keyof typeof getTeamBaseColor][game.visiting_team.id]
        const gameDate = format(game.date, 'EEE, dd MMM yyyy');
        const duration = formatDuration(h.duration_ms / 1000)

        return (
            <div key={game.id} onClick={() => onClickVideo(h.id)} className="latest-single">
                <div className="latest-single-box">
                    <div style={{backgroundColor: homeTeamColor}} className="latest-single-bg">
                        <div style={{backgroundColor: awayTeamColor}} className="latest-highlights-away-bg"></div>
                    </div>                
                    <div className="latest-single-team">
                        <div className="latest-single-team-logo">
                            <Image src={game.home_team.logo_url} alt={game.home_team.name} width={60} height={60} />
                        </div>
                        <div className="latest-single-team-logo">
                            <Image src={game.visiting_team.logo_url} alt={game.visiting_team.name} width={60} height={60} />
                        </div>
                    </div>
                    <div className='latest-highlights-duration'>{duration}</div>
                </div>
                <div className="latest-single-info">
                    <div className='latest-highlights-title'>Highlights</div>
                    <div className="latest-single-info-league">{league}</div>
                    <div className="latest-single-info-date">{gameDate}</div>
                    <div className="latest-single-info-match">
                        <div>{home_team.name} {game.home_team_goals} - {game.visiting_team_goals} {visiting_team.name}</div>
                    </div>
                </div>
            </div>
        )
    })

  return (
    <div className="home-latest-highlights-cont">
        <div className="middle-container">
            <div className="section-header opposite">
                <div className="section-title">
                    {t("latest highlights")}
                    <div className="section-title-mask"></div>
                </div>
            </div>
            <div 
                className="latest-highlights-list"
                ref={listRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endPointerDrag}
                onPointerCancel={onPointerCancel}
                onPointerLeave={onPointerLeave}
                onClickCapture={onClickCapture}
            >
                {latestHighlightsList}
            </div>
        </div>
    </div>  
  )
}

export default HomeLatestHighlights