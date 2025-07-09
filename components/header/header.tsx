import React from 'react'
import Link from 'next/link';
import { getHeaderLogo } from '@/utilities/imageUtil';
import Image from 'next/image';
import config from "@/config";
import "./header.css";
import NorwayFlag from "@/public/img/norway-flag.png";
import EnglishFlag from "@/public/img/united-kingdom-flag.png";

function Header() {

  const headerLogo = getHeaderLogo[config.target]
  const clubWebsite = config.clubWebsite
  const leagueWebsite = config.leagueWebsite

  const topHeader = (
    <div className="header-top-cont">
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
  )

  return (
    <div className="header-container">
      <div className="page-container">
        {topHeader}
        <div className='header-main'>
          <Link href="/" className="header-link">
            <Image src={headerLogo} alt="team logo"/>
          </Link>
          <Link href="/matches" className="header-link">
            Fixtures & Results
          </Link>
          <Link href="/videos" className="header-link">
            Videos
          </Link>
          <Link href="/statistics" className="header-link">
            Statistics
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header