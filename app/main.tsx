import React from 'react'
import Header from '@/components/header/header';
import "./main.css";

// Main component for the application, direct children to the Layout component
function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-page">
        <Header />
        {children}
    </div>
  )
}

export default Main