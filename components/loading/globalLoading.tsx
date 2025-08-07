"use client"
import { useEffect } from 'react'
import { getHeaderLogo } from '@/utilities/imageUtil';
import config from '@/config';
import Image from 'next/image';
import "./globalLoading.css"

// Loading to be used everywhere in loading.tsx
// TODO rename
function GlobalLoading() {

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const mainLogo = getHeaderLogo[config.target] || getHeaderLogo["default"]
  
  return (
    <div className="global-loading">
      <div className="global-loading-logo">
        <Image src={mainLogo} alt="main logo" />
      </div>
    </div>
  )
}

export default GlobalLoading