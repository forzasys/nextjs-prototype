import React from 'react'
import ReactQueryProvider from "@/lib/react-query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from './components/header/header';
import "./main.css";

function Main({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider dehydratedState={{ queries: [], mutations: [] }}>
        <div className="main-page">
            <Header />
            {children}
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  )
}

export default Main