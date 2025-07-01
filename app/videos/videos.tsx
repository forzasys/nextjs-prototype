import { VideoCollection } from '@/components/videosLibrary/videoCollection';
// import { PlaylistType } from '@/types/dataTypes';

function Videos({ params }: {params: URLSearchParams}) {

  const tagParam = params.get("tag")

  const collectionsInVideo = ["goal", "shot", "yellow card", "red card"]

  const initialVideos = (
    <>
      {collectionsInVideo.map((collectionName) => {
        const hideCollection = !!tagParam && collectionName !== tagParam
        return (
          <VideoCollection 
            key={collectionName} 
            params={params} 
            collectionName={collectionName}
            hideCollection={hideCollection}
          />
        )
      })}
    </>
  )

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "32px"}}>
      {initialVideos}
    </div>
  )
}

export default Videos