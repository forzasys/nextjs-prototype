import { ReactNode } from 'react'
import VideoSuggestions from './VideoSuggestions'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <main>
        {children}
      </main>
      <br />
      <VideoSuggestions />
    </div>
  )
}