import { PlaylistType } from '@/types/dataTypes';
import { collectionTitles } from './videoCollectionSlide';
import Playlist from '@/components/playlist/playlist';
import { useTranslations } from 'next-intl';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "./videoCollection.css";

interface VideoCollectionProps {
    playlists?: PlaylistType[] | undefined
    collectionName: string
    index: number
}

export function CollectionSlide({playlists, collectionName, index}: VideoCollectionProps) {

  const t = useTranslations();

  const collectionTitle = collectionTitles[collectionName] || collectionName;

  const playlist = (
    <div className="collection-slide-playlist-container">
      {playlists?.map((p: PlaylistType) => {
        return (
          <div key={p.id} className="collection-slide-playlist-single">
            <Playlist playlist={p} query={{}}/>
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

  let render

  // if (isLoading) render = <div >Loading...</div>

  if (playlists?.length === 0) return null

  else render = playlist

  return (
    <div 
      className="collection-slide-container aos-init aos-animate" 
      data-aos="fade-up"
      data-aos-delay={index <= 1 ? index * 100 : 0}
    >
      <div className="collection-single middle-container">
        <div className="collection-title-cont">
          <div className="collection-slide-title">{t(collectionTitle)}</div>
          <button  className="collection-title-more">
            {t("more")}
            <MdOutlineArrowForwardIos/>
          </button>
        </div>
        {render}
      </div>
    </div>
  )
}

export default CollectionSlide