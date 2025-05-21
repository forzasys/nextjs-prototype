'use client';
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
        <Link href="/highlights" className="header-link">
          <div className="header-link"> Highlights</div>
           
        </Link>
        <Link href="/games" className="header-link">
            Games
        </Link>
    </div>
  )
}

export default Header