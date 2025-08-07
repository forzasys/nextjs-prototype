"use client"
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import "./videoCollection.css";

function VideoCollectionMore({collectionName}: {collectionName: string}) {

    const router = useRouter();
    const t = useTranslations();
    const locale = useLocale(); 

    const onClickMore = () => {
        router.push(`/${locale}/videos?event=${collectionName}`)
    }

  return (
    <div onClick={onClickMore} className="collection-title-more">
      {t("more")}
      <MdOutlineArrowForwardIos/>
    </div>
  )
}

export default VideoCollectionMore