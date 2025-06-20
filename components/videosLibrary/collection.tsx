import React from 'react'
import { getVideosCollection } from './videosCollection';
import { PlaylistType } from '@/types/dataTypes';

async function Collection ({collection}: {collection: string}) {

  const [collectionTitle, collectionData] = await getVideosCollection(collection);

  const renderPlaylist = (
    <div>
      {collectionData.map((p: PlaylistType) => {
        return (
          <div key={p.id}>
            {p.description}
          </div>
        )
      })}
    </div>
  )

  return (
    <div>
      <div>{collectionTitle}</div>
      <br />
      {renderPlaylist}
    </div>
  )
}

export default Collection