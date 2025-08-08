// import HeaderSearch from './headerSearch';
import Link from "next/link";
import { useLocale, useTranslations } from 'next-intl';
import { getHeaderLogo } from '@/utilities/imageUtil';
import MobileHeader from './mobileHeader';
import Image from 'next/image';
import config from "@/config";
import LocaleSwitcher from '../localeSwitcher/localeSwitcher';
import { FaFacebook, FaInstagram, FaSnapchat } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./header.css";

function DesktopHeader() {

  const clubWebsite = config.clubWebsite
  const leagueWebsite = config.leagueWebsite

  const locale = useLocale()
  const t = useTranslations()
  const headerLogo = getHeaderLogo[config.target] || getHeaderLogo["default"]
  const hasStatisticsPage = config.hasStatisticsPage

  const topHeader = (
    <div className="top-header-container">
      <div className="top-header-left">
        <div className="top-header-social-media">
          <FaFacebook />
          <FaInstagram />
          <FaXTwitter />
          <FaSnapchat />
        </div>
      </div>
      <div className="top-header-right">
        {leagueWebsite && (
          <a href={leagueWebsite} className="club-website-link" target="_blank">{leagueWebsite.replace("https://", "")}</a>
        )}
        {clubWebsite && (
          <a href={clubWebsite} className="club-website-link" target="_blank">{clubWebsite.replace("https://", "")}</a>
        )}
      </div>                
    </div>
  )

  const mainHeader = (
    <div className='header-main'>    
      <div className="header-links">
        {headerLogo && (
          <Link href={`/${locale}`} className="header-link">
            <Image src={headerLogo} alt="team logo"/>
          </Link>
        )}
        <Link href={`/${locale}/${t("matches")}`} className="header-link">
          {t("fixtures")} & {t("results")}
        </Link>
        <Link href={`/${locale}/${t("videos")}`} className="header-link">
          {t("videos")}
        </Link>
        {hasStatisticsPage && (
          <Link href={`/${locale}/${t("statistics")}`} className="header-link">
            {t("statistics")}
          </Link>
        )}
      </div>
      <div className="header-right">
        <LocaleSwitcher />
        {/* <HeaderSearch /> */}
      </div>
    </div>
  )

  return (
    <div className="desktop-header middle-container">
      {topHeader}
      {mainHeader}
    </div>
  )
}

function Header() {

  return ( 
    <div className="header-container">
      <MobileHeader />
      <DesktopHeader />
    </div>
  )
}

export default Header