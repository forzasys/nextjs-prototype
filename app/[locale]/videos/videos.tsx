import { VideoCollectionSlide } from '@/components/videosLibrary/videoCollectionSlide';
import config from '@/config';
import { collectionsToShow } from '@/utilities/utils';
import VideoCollection from '@/components/videosLibrary/videoCollection';
import { Suspense } from 'react';

function Videos({ params }: {params: URLSearchParams}) {

  const eventParam = params.get("event")
  const playerParam = params.get("player")
  const teamPlatformId = config.team
  const isTeamPlatform = !!teamPlatformId

  const collectionsInVideo = collectionsToShow

  const checkShowCollection = (collectionName: string) => {
    if (collectionName === "assist") {
      if (isTeamPlatform) {
        if (!playerParam) return false
      } else {
        if (eventParam !== "assist") return false
      }
    }
    if (collectionName === "save" && eventParam !== "save") {
      return false
    }
    return true
  }

  // Filter collections that will be shown
  const visibleCollections = collectionsInVideo.filter(collectionName => 
    checkShowCollection(collectionName)
  );

  const hasEventParam = !!eventParam

  return (
    <div className="">
      {hasEventParam ? (
        <Suspense fallback={<div className="middle-container">Loading...</div>}>
          {/* Client component handles its own fetching with React Query */}
          <VideoCollection collectionName={eventParam} />
        </Suspense>
      ) : (
        // Server component prefetches multiple playlists concurrently
        <VideoCollectionSlide searchParams={params} visibleCollections={visibleCollections} />
      )}
    </div>
  )
}

export default Videos