'use client'
import { GameType, PlaylistType, TagsType } from "@/types/dataTypes"
import Link from "next/link"
import config from "@/config"
import { useLocale, useTranslations } from "next-intl"
import { ignoredTags } from "@/utilities/utils"
import "./videoPage.css"

const pathnameTranslations = {
    "en": "en/videos",
    "no": "no/videoer",
    "sv": "sv/videor",
}

function getTeamIdFromTag (tag: TagsType, game: GameType, oppositeTeam: boolean) {
    
    if (!tag.team) return null

    if (game && oppositeTeam) {
        const awayTeamEvent = tag.team.id === game.visiting_team.id
        if (awayTeamEvent) return game.home_team.id
        else return game.visiting_team.id
    }
    return tag.team.id
}

function getLinksFromTag (key: string, tag: TagsType, playlist: PlaylistType, locale: string) {
    
    const query = new URLSearchParams()
    const teamPlatformId = config.team
    
    const {game, recording_timestamp} = playlist
    const season = recording_timestamp.split("-")[0]
    query.set("season", season)

    const offendingPlayer = key === "offending player"
    const keeper = key === "keeper"
    const ownGoal = tag["shot type"]?.value === "own goal"
    const oppositeTeam = offendingPlayer || keeper || ownGoal

    const playerId = (tag[key] as { id?: number })?.id
    const playerTeam = getTeamIdFromTag(tag, game, oppositeTeam)

    if (playerId && playerTeam) {
        query.set("team", playerTeam?.toString())
        query.set("player", playerId.toString())
    } 

    else if (teamPlatformId) {
        query.set("team", teamPlatformId.toString())
    }
    
    const pathname = pathnameTranslations[locale as keyof typeof pathnameTranslations]
    const href = `/${pathname}?${query.toString()}`
    
    return href
}

interface LinkType {
    key: string;
    text: string | undefined;
    href?: string | null;
}

function useGetPlaylistCategoryAndPlayerLinks (playlist: PlaylistType) {

    const locale = useLocale()
    const t = useTranslations()

    const {events, game, filters} = playlist
    const tag = events[0]?.tags[0]
    if (!tag) return []

    const isValidEvent = !ignoredTags.includes(tag.action)
    const isHighlights = filters.includes("playlist")

    const links: LinkType[] = []

    if (isValidEvent && !isHighlights) {
        links.push({
            key: "event", 
            text: t(tag.action), 
            href: `/${locale}/videos?event=${tag.action}`,
        })
    }

    if (game && !isHighlights) {
        if ("scorer" in tag) {
            links.push({
                key: "scorer",
                text: tag["scorer"]?.value,
                href: getLinksFromTag("scorer", tag, playlist, locale),
            })
        }
        if ("assist by" in tag) {
            links.push({
                key: "assist by",
                text: tag["assist by"]?.value,
                href: getLinksFromTag("assist by", tag, playlist, locale),
            })
        }
        if ("assist1" in tag) {
            links.push({
                key: "assist1",
                text: tag["assist1"]?.value,
                href: getLinksFromTag("assist1", tag, playlist, locale),
            })
        }
        if ("assist2" in tag) {
            links.push({
                key: "assist2",
                text: tag["assist2"]?.value,
                href: getLinksFromTag("assist2", tag, playlist, locale),
            })
        }
        if ("player" in tag) {
            links.push({
                key: "player",
                text: tag["player"]?.value,
                href: getLinksFromTag("player", tag, playlist, locale),
            })
        }
        if ("keeper" in tag && "shot result" in tag && tag["shot result"]?.value === "saved") {
            links.push({
                key: "keeper",
                text: tag["keeper"]?.value,
                href: getLinksFromTag("keeper", tag, playlist, locale),
            })
        }
        if ("goalkeeper" in tag) {
            links.push({
                key: "goalkeeper",
                text: tag["goalkeeper"]?.value,
                href: getLinksFromTag("goalkeeper", tag, playlist, locale),
            })
        }
        if ("player in" in tag) {
            links.push({
                key: "player in",
                text: tag["player in"]?.value,
                href: getLinksFromTag("player in", tag, playlist, locale),
            })
        }
        if ("player out" in tag) {
            links.push({
                key: "player out",
                text: tag["player out"]?.value,
                href: getLinksFromTag("player out", tag, playlist, locale),
            })
        }
        if ("player awarded" in tag) {
            links.push({
                key: "player awarded",
                text: tag["player awarded"]?.value,
                href: getLinksFromTag("player awarded", tag, playlist, locale),
            })
        }
        if ("offending player" in tag) {
            links.push({
                key: "offending player",
                text: tag["offending player"]?.value,
                href: getLinksFromTag("offending player", tag, playlist, locale),
            })
        }
        if ("offending_player" in tag) {
            links.push({
                key: "offending_player",
                text: tag["offending_player"]?.value,
                href: getLinksFromTag("offending_player", tag, playlist, locale),
            })
        }
    }

    // Highlight video tag links
    if (isHighlights) {
        if (game) {
            if (game.home_team) {
                links.push({
                    key: "home team",
                    text: game.home_team.name,
                    href: `/${locale}/videos?team=${game.home_team.id}`,
                })
            }
            if (game.visiting_team) {
                links.push({
                    key: "away team",
                    text: game.visiting_team.name,
                    href: `/${locale}/videos?team=${game.visiting_team.id}`,
                })
            }
        }
    }

    return links
}

interface VideoTagsProps {
    playlist: PlaylistType 
}

function VideoTags ({playlist}: VideoTagsProps) {

    const playlistCategories = useGetPlaylistCategoryAndPlayerLinks(playlist) || []
    
    return (
        <div className="video-page-tags">
            {playlistCategories.map(({key, text, href}) => {
                if (!href) return (
                    <div key={key} className="video-page-single-tag">{text}</div>
                )
                return (
                    <Link key={key} href={href} className="video-page-single-tag">
                        {text}
                    </Link>
                )
            })}
        </div>
    )
}

export default VideoTags