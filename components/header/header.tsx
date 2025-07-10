import React from 'react'
import HeaderSearch from './headerSearch';
import Link from 'next/link';
import { getHeaderLogo } from '@/utilities/imageUtil';
import Image from 'next/image';
import config from "@/config";
import NorwayFlag from "@/public/img/norway-flag.png";
import EnglishFlag from "@/public/img/united-kingdom-flag.png";
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
        <div className="header-top-languages">
          <div className="language-selection-title">Language</div>
          <Image src={NorwayFlag} alt="Norway flag" className="language-selection-flag"/>
          <Image src={EnglishFlag} alt="English flag" className="language-selection-flag"/>
        </div>
      </div>
    </div>
  )
}

function Header() {

  const headerLogo = getHeaderLogo[config.target] || getHeaderLogo["default"]
  const hasStatisticsPage = config.hasStatisticsPage

  return (
    <div className="header-container">
      <div className="middle-container">
        <TopHeader />
        <div className='header-main'>    
          <div className="header-links">
            {headerLogo && (
              <Link href="/" className="header-link">
                <Image src={headerLogo} alt="team logo"/>
              </Link>
            )}
            <Link href="/matches" className="header-link">
              Fixtures & Results
            </Link>
            <Link href="/videos" className="header-link">
              Videos
            </Link>
            {hasStatisticsPage && (
              <Link href="/statistics" className="header-link">
                Statistics
              </Link>
            )}
          </div>
          <div className="header-right">
            <HeaderSearch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header