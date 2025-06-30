import React from 'react'
import { getVideosCollection } from './videosCollection';
import { PlaylistType } from '@/types/dataTypes';
import Playlist from '../playlist/playlist';

async function Collection ({collection}: {collection: string}) {

  const [collectionTitle, collectionData] = await getVideosCollection(collection);

  const renderPlaylist = (
    <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
      {collectionData.map((p: PlaylistType) => {
        return (
          <Playlist key={p.id} playlist={p} />
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