import React from 'react'
import { onFetch } from "@/utilities/fetchApi"
import { GameType, TableType } from '@/types/dataTypes'
import Image from 'next/image'
import Link from 'next/link'
import config from '@/config'
import { checkMultipleMatchesResult } from '@/utilities/utils'
import { useLocale, useTranslations } from 'next-intl'

interface H2HTableProps {
    table: TableType[]
    homeTeamId: number
    awayTeamId: number
}

async function HeadToHeadTable({ table, homeTeamId, awayTeamId }: H2HTableProps) {
        
    const tableList = (
        <div>
            <div style={{display: "flex", gap: "7px"}}>
                <div>Rank</div>
                <div style={{width: "175px"}}>Team</div>
                <div>Played</div>  
                <div>Wins</div>
                <div>Ties</div>
                <div>Losses</div>
                <div>GS</div>
                <div>GC</div>
                <div>GD</div>
                <div>Points</div>
            </div>
            {table.map((t: TableType) => {
                return (
                    <div key={t.id} style={{display: "flex", gap: "7px", border: (t.id === homeTeamId || t.id === awayTeamId) ? "1px solid black" : "none"}}>
                        <div>{t.rank}</div>
                        <div style={{width: "175px"}}>{t.name}</div>
                        <div>{t.games_played}</div>  
                        <div>{t.wins}</div>
                        <div>{t.ties}</div>
                        <div>{t.losses}</div>
                        <div>{t.goals}</div>
                        <div>{t.goals_conceded}</div>
                        <div>{t.goal_difference}</div>
                        <div>{t.points}</div>
                    </div>
                )
            })}
        </div>
    )

    return (
        <div>
            {tableList}
        </div>
    )
}

interface RecentIndividualMatchesProps {
    homeTeamId: number
    awayTeamId: number
    homeTeamGames: GameType[]
    awayTeamGames: GameType[]
}

function RecentIndividualMatches({ homeTeamId, awayTeamId, homeTeamGames, awayTeamGames }: RecentIndividualMatchesProps) {

    const t = useTranslations();
    const locale = useLocale();
    const lastFiveHomeTeamGames = homeTeamGames.slice(0, 5)
    const lastFiveAwayTeamGames = awayTeamGames.slice(0, 5)

    const homeTeamResults = checkMultipleMatchesResult(homeTeamId, lastFiveHomeTeamGames)
    const awayTeamResults = checkMultipleMatchesResult(awayTeamId, lastFiveAwayTeamGames)

    const homeTeamGamesList = (
        <div>
            <div style={{display: "flex", gap: "10px"}}>
                {homeTeamResults.map((result, idx) => {
                    if (result === "won") result = "W"
                    if (result === "lost") result = "L"
                    if (result === "draw") result = "D"
                    return (
                        <div key={idx} style={{width: "20px", textAlign: "center"}}>{result}</div>
                    )
                })}
            </div>
            <br />
            {lastFiveHomeTeamGames.map((game) => {
                return (
                    <Link key={game.id} href={`/${locale}/match/${game.id}`} style={{display: "flex", marginBottom: "10px", alignItems: "center"}}>
                        <div className='single-game-team-logo'>
                            <Image src={game.home_team.logo_url} alt="team logo" width={30} height={30}/>
                        </div>
                        <div>{game.home_team.name}</div>
                        <div>{game.home_team_goals}</div>
                        <div>-</div>
                        <div>{game.visiting_team_goals}</div>
                        <div className='single-game-team-logo'>
                            <Image src={game.visiting_team.logo_url} alt="team logo" width={30} height={30}/>
                        </div>
                        <div>{game.date}</div>
                    </Link>
                )
            })}
        </div>
    )

    const awayTeamGamesList = (
        <div>
            <div style={{display: "flex", gap: "10px"}}>
                {awayTeamResults.map((result, idx) => {
                    if (result === "won") result = "W"
                    if (result === "lost") result = "L"
                    if (result === "draw") result = "D"
                    return (
                        <div key={idx} style={{width: "20px", textAlign: "center"}}>{result}</div>
                    )
                })}
            </div>
            <br />
            {lastFiveAwayTeamGames.map((game) => {
                return (
                    <Link key={game.id} href={`/${locale}/match/${game.id}`} style={{display: "flex", marginBottom: "10px", alignItems: "center"}}>
                        <div className='single-game-team-logo'>
                            <Image src={game.home_team.logo_url} alt="team logo" width={30} height={30}/>
                        </div>
                        <div>{game.home_team.name}</div>
                        <div>{game.home_team_goals}</div>
                        <div>-</div>
                        <div>{game.visiting_team_goals}</div>
                        <div className='single-game-team-logo'>
                            <Image src={game.visiting_team.logo_url} alt="team logo" width={30} height={30}/>
                        </div>
                        <div>{game.date}</div>
                    </Link>
                )
            })}
        </div>
    )

    return (
        <div>
            <div>{t("recent individual matches")}</div>
            <br />
            <div style={{display: "flex", gap: "100px"}}>
                {homeTeamGamesList}
                {awayTeamGamesList}
            </div>
        </div>
    )
}
interface RecentMeetingsProps {
    games: GameType[]
}

function RecentMeetings({ games }: RecentMeetingsProps) {

    const t = useTranslations();
    const locale = useLocale();
    const lastMeetings = games.slice(0, 3)

    const headToHeadGames = (
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            {lastMeetings.map((game) => {
                return (
                    <Link key={game.id} href={`/${locale}/match/${game.id}`} style={{display: "flex", marginBottom: "10px", alignItems: "center"}}>
                        <div className='single-game-team-logo'>
                            <Image src={game.home_team.logo_url} alt="team logo" width={30} height={30}/>
                        </div>
                        <div>{game.home_team.name}</div>
                        <div>{game.home_team_goals}</div>
                        <div>-</div>
                        <div>{game.visiting_team_goals}</div>
                        <div>{game.visiting_team.name}</div>
                        <div className='single-game-team-logo'>
                            <Image src={game.visiting_team.logo_url} alt="team logo" width={30} height={30}/>
                        </div>
                        <div>{game.date}</div>
                    </Link>
                )
            })}
        </div>
    )

    return (
        <div>
            <div>{t("most recent meetings")}</div>
            <br />
            {headToHeadGames}
        </div>
    )
}

interface MatchHeadToHeadProps {
    game?: GameType
    table: TableType[]
}

async function MatchHeadToHead({ game, table }: MatchHeadToHeadProps) {

    if (!game) return null

    const hasStatisticsPage = config.hasStatisticsPage
    const homeTeamId = game.home_team.id
    const awayTeamId = game.visiting_team.id

    const dayBeforeGameDate = new Date(game.date)
    dayBeforeGameDate.setDate(dayBeforeGameDate.getDate() - 1)
    const dayBeforeGameDateString = dayBeforeGameDate.toISOString().split('T')[0]

    const allHomeTeamGamesQuery = {
        to_date: dayBeforeGameDateString,
        asc: false,
        count: 99,
        team_id: homeTeamId
    }

    const allAwayTeamGamesQuery = {
        to_date: dayBeforeGameDateString,
        asc: false,
        count: 99,
        team_id: awayTeamId
    }

    const [allHomeTeamGamesData, allAwayTeamGamesData] = await Promise.all([
        onFetch("game", allHomeTeamGamesQuery),
        onFetch("game", allAwayTeamGamesQuery)
    ])
    
    const homeTeamGames = allHomeTeamGamesData?.games || []
    const awayTeamGames = allAwayTeamGamesData?.games || []
    
    const headToHeadGames = homeTeamGames.filter((game: GameType) => awayTeamGames.some((g: GameType) => g.id === game.id))
    
    console.log(headToHeadGames)

    return (
      <div>
        <RecentMeetings games={headToHeadGames} />
        <br />
        <RecentIndividualMatches homeTeamId={homeTeamId} awayTeamId={awayTeamId} homeTeamGames={homeTeamGames} awayTeamGames={awayTeamGames} />
        <br />
        {hasStatisticsPage && (
            <HeadToHeadTable table={table} homeTeamId={homeTeamId} awayTeamId={awayTeamId} />
        )}
      </div>
    )
}

export default MatchHeadToHead