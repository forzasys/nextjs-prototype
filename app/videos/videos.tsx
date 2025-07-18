import { VideoCollectionSlide } from '@/components/videosLibrary/videoCollectionSlide';
import config from '@/config';
import { collectionsToShow } from '@/utilities/utils';
import VideoCollection from '@/components/videosLibrary/videoCollection';

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

  const allCollections = collectionsInVideo.map((collectionName) => {
    const showCollection = visibleCollections.includes(collectionName)
    return (
      <VideoCollectionSlide 
        key={collectionName} 
        collectionName={collectionName}
        params={params} 
        visibleCollections={visibleCollections}
        showCollection={showCollection}
      />
    )
  })

  const hasEventParam = !!eventParam

  return (
    <div className="videos-collections">
      {hasEventParam ? <VideoCollection collectionName={eventParam} /> : allCollections}
    </div>
  )
}

export default Videos