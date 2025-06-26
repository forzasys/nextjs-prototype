import React from 'react'
import Link from 'next/link';
import warnerBrosImg from "@/public/img/WarnerBros.png";
import Image from 'next/image';
import "./header.css";

function Header() {
  return (
    <div className='header-main'>
        <Link href="/" className="header-link">
            <Image src={warnerBrosImg} alt="Warner Bros Logo"/>
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