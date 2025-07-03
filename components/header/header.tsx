import React from 'react'
import Link from 'next/link';
import { getHeaderLogo } from '@/utilities/imageUtil';
import Image from 'next/image';
import config from "@/config";
import "./header.css";

function Header() {

  const headerLogo = getHeaderLogo[config.target]

  return (
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
  )
}

export default Header