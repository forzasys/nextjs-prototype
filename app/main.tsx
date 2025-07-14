import React from 'react'
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import "@/styles/index.css";

// Main component for the application, direct children to the Layout component
function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="main-page">
        <Header />
        <div className="main-content">
          {children}
        </div>
        <Footer />
    </div>
  )
}

export default Main