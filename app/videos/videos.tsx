import { VideoCollection } from '@/components/videosLibrary/videoCollection';
import config from '@/config';
import { collectionsToShow } from '@/utilities/utils';
// import { PlaylistType } from '@/types/dataTypes';

function Videos({ params }: {params: URLSearchParams}) {

  const eventParam = params.get("event")
  const playerParam = params.get("player")
  const teamPlatformId = config.team
  const isTeamPlatform = !!teamPlatformId

  const collectionsInVideo = collectionsToShow

  const checkShowCollection = (collectionName: string) => {
    if (!!eventParam && collectionName !== eventParam) return false
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

  return (
    <div className="videos-collections">
      {collectionsInVideo.map((collectionName) => {
        const showCollection = visibleCollections.includes(collectionName)
        return (
          <VideoCollection 
            key={collectionName} 
            collectionName={collectionName}
            params={params} 
            visibleCollections={visibleCollections}
            showCollection={showCollection}
          />
        )
      })}
    </div>
  )
}

export default Videos