"use client"
import React from 'react'
import HeaderSearch from './headerSearch';
import Link from "next/link";
import { useLocale, useTranslations } from 'next-intl';
import { getHeaderLogo } from '@/utilities/imageUtil';
import Image from 'next/image';
import config from "@/config";
import LocaleSwitcher from '../localeSwitcher/localeSwitcher';
import { FaFacebook, FaInstagram, FaSnapchat } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./header.css";

function TopHeader() {

  const clubWebsite = config.clubWebsite
  const leagueWebsite = config.leagueWebsite

  return (
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
}

function Header() {

  const locale = useLocale();
  const t = useTranslations()

  const headerLogo = getHeaderLogo[config.target] || getHeaderLogo["default"]
  const hasStatisticsPage = config.hasStatisticsPage

  return (
    <div className="header-container">
      <div className="middle-container">
        <TopHeader />
        <div className='header-main'>    
          <div className="header-links">
            {headerLogo && (
              <Link href={`/${locale}`} className="header-link">
                <Image src={headerLogo} alt="team logo"/>
              </Link>
            )}
            <Link href={`/${locale}/matches`} className="header-link">
              {t("fixtures")} & {t("results")}
            </Link>
            <Link href={`/${locale}/videos`} className="header-link">
              {t("videos")}
            </Link>
            {hasStatisticsPage && (
              <Link href={`/${locale}/statistics`} className="header-link">
                {t("statistics")}
              </Link>
            )}
          </div>
          <div className="header-right">
            <LocaleSwitcher />
            {/* <HeaderSearch /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header