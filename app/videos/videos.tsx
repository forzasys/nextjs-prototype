import { VideoCollection } from '@/components/videosLibrary/videoCollection';
// import { PlaylistType } from '@/types/dataTypes';

function Videos({ params }: {params: URLSearchParams}) {

  const eventParam = params.get("event")

  const collectionsInVideo = ["goal", "assist", "shot", "yellow card", "red card", "saves"]

  const checkShowCollection = (collectionName: string) => {
    if (!!eventParam && collectionName !== eventParam) return false
    if (collectionName === "assist" && eventParam !== "assist") return false
    if (collectionName === "saves" && eventParam !== "saves") return false
    return true
  }

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "32px"}}>
      {collectionsInVideo.map((collectionName) => {
        const showCollection = checkShowCollection(collectionName)
        return (
          <VideoCollection 
            key={collectionName} 
            collectionName={collectionName}
            params={params} 
            showCollection={showCollection}
          />
        )
      })}
    </div>
  )
}

export default Videos