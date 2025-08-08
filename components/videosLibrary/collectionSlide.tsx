import { PlaylistType, QueryType } from '@/types/dataTypes';
import { collectionTitles } from './videoCollectionSlide';
import Playlist from '@/components/playlist/playlist';
import VideoCollectionMore from './videoCollectionMore';
import { useTranslations } from 'next-intl';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "./videoCollection.css";

interface VideoCollectionProps {
    playlists?: PlaylistType[] | undefined
    collectionName: string
    query: QueryType
    index: number
}

export function CollectionSlide({playlists, collectionName, index, query}: VideoCollectionProps) {

  const t = useTranslations(); 
  const collectionTitle = collectionTitles[collectionName] || collectionName;

  const renderPlaylists = (
    <div className="collection-slide-playlist-container">
      {playlists?.map((p: PlaylistType) => {
        const session = {playlistId: p.id, query}
        return (
          <div key={p.id} className="collection-slide-playlist-single">
            <Playlist playlist={p} session={session}/>
          </div>
        )
      })}
      <div className="collection-playlist-slider">
        <div className="collection-playlist-slider-button">
          <MdOutlineArrowForwardIos/>
        </div>
      </div>
    </div>
  )

  if (playlists?.length === 0) return null

  return (
    <div 
      className="collection-slide-container aos-init aos-animate" 
      data-aos="fade-up"
      data-aos-delay={index <= 1 ? index * 100 : 0}
    >
      <div className="collection-single middle-container">
        <div className="collection-title-cont">
          <div className="collection-slide-title">{t(collectionTitle)}</div>
          <VideoCollectionMore collectionName={collectionName}/>
        </div>
        {renderPlaylists}
      </div>
    </div>
  )
}

export default CollectionSlide