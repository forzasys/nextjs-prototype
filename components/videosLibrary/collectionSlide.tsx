import { PlaylistType } from '@/types/dataTypes';
import { collectionTitles } from './videoCollectionSlide';
import Playlist from '@/components/playlist/playlist';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "./videoCollection.css";

interface VideoCollectionProps {
    playlists?: PlaylistType[] | undefined
    collectionName: string
    visibleCollections?: string[]
}

export function CollectionSlide({playlists, collectionName, visibleCollections}: VideoCollectionProps) {

  const router = useRouter();
  // const searchParams = useSearchParams();
  // const initialCollectionQuery = videoCollectionQueries({collectionName});
  // const query = generatePlaylistQueryFromParams(searchParams, initialCollectionQuery);
  const t = useTranslations();

  // collection slide doesn't need all the videos
  // query.count = 9

  const onClickMore = () => {
    router.push(`/videos?event=${collectionName}`);
  }

  const collectionTitle = collectionTitles[collectionName] || collectionName;

  const collectionIndex = visibleCollections?.indexOf(collectionName)
  let collectionGroup = ""

  if (collectionIndex === 0) {
      collectionGroup = "top-first"
  }
  if (collectionIndex === 2 || collectionIndex === 3) {
      collectionGroup = "primary-color"
  }

  const playlist = (
    <div className="collection-slide-playlist-container">
      {playlists?.map((p: PlaylistType) => {
        return (
          <div key={p.id} className="collection-slide-playlist-single">
            {/* {p.description} */}
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
        className={classNames("collection-slide-container", collectionGroup)} 
      data-aos="fade-up"
      data-aos-delay={collectionIndex && collectionIndex <= 1 ? collectionIndex * 100 : 0}
    >
      <div className="collection-single middle-container">
        <div className="collection-title-cont">
          <div className="collection-slide-title">{t(collectionTitle)}</div>
          <button onClick={onClickMore} className="collection-title-more">
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