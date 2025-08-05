"use client"
import {useEffect, useState} from 'react'
import config from "@/config";
import { getHeaderLogo } from '@/utilities/imageUtil';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/localeSwitcher/localeSwitcher';
import classNames from 'classnames';
import { MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

function MobileHeader() {

    const locale = useLocale()
    const t = useTranslations()
    const hasStatisticsPage = config.hasStatisticsPage
    const [menuOpen, setMenuOpen] = useState(false)

    const clubWebsite = config.clubWebsite
    const leagueWebsite = config.leagueWebsite

    useEffect(() => {
      document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [menuOpen]);
  
  
    const headerLogo = getHeaderLogo[config.target] || getHeaderLogo["default"]
  
    const mobileHeaderContent = (
      <div className="mobile-header-content">
        <div className="mobile-header-content-links">
            <Link href={`/${locale}/matches`} className="mobile-header-content-link">
                {t("fixtures")} & {t("results")}
            </Link>
            <Link href={`/${locale}/videos`} className="mobile-header-content-link">
                {t("videos")}
            </Link>
            {hasStatisticsPage && (
                <Link href={`/${locale}/statistics`} className="mobile-header-content-link">
                  {t("statistics")}
                </Link>
            )}
            
        </div>
        <div className="mobile-header-content-bottom">
            <div className="mobile-header-bottom-locale">
                <LocaleSwitcher mobile/>
            </div>
            {leagueWebsite && (
                <a href={leagueWebsite} className="mobile-header-bottom-link" target="_blank">{leagueWebsite.replace("https://", "")}</a>
            )}
            {clubWebsite && (
                <a href={clubWebsite} className="mobile-header-bottom-link" target="_blank">{clubWebsite.replace("https://", "")}</a>
            )}
        </div>                
      </div>
    )
  
    return (
      <div className="mobile-header">
        <Link href={`/${locale}`} className="mobile-header-logo">
          <Image src={headerLogo} alt="team logo"/>
        </Link>
        <div onClick={() => setMenuOpen(!menuOpen)} className="mobile-header-menu">
            <AiOutlineClose className={classNames("mobile-header-menu-icon", {
                "show": menuOpen,
                "hide": !menuOpen
            })} />
            <MdMenu className={classNames("mobile-header-menu-icon", {
                "show": !menuOpen,
                "hide": menuOpen
            })} />
        </div>
        {menuOpen && mobileHeaderContent}
      </div>
    )
  }

export default MobileHeader