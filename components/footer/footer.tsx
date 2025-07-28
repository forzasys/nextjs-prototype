import config from '@/config'
import { getHeaderLogo } from '@/utilities/imageUtil'
import Link from 'next/link'
import Image from 'next/image'
import './footer.css'
import { useLocale, useTranslations } from 'next-intl'

function Footer() {

    const t = useTranslations();
    const locale = useLocale();
    const headerLogo = getHeaderLogo[config.target] || getHeaderLogo["default"]
    const hasStatisticsPage = config.hasStatisticsPage

    return (
        <div className="footer">
            <div className="footer-container middle-container">
                <div className="footer-header">
                    <Link href={`/${locale}`} className="footer-header-logo">
                      <Image src={headerLogo} alt="team logo" />
                    </Link>
                </div>
                <div className="footer-content-cont">
                    <div className="footer-content">
                        <Link href={`/${locale}/matches`} className="footer-content-link">{t("fixtures")} & {t("results")}</Link>
                        <Link href={`/${locale}/videos`} className="footer-content-link">{t("videos")}</Link>
                        {hasStatisticsPage && (
                            <Link href={`/${locale}/statistics`} className="footer-content-link">{t("statistics")}</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer