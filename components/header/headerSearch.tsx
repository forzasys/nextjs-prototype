"use client"
import { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import "./header.css"

function HeaderSearch() {

    const [searchPrompt, setSearchPrompt] = useState("")

  return (
    <div className="header-search">
        <input 
            type="text" 
            placeholder="Type to search" 
            value={searchPrompt} 
            onChange={(e) => setSearchPrompt(e.target.value)} 
            className="header-search-input"
        />
        <FaSearch className="header-search-icon" />
    </div>
  )
}

export default HeaderSearch