import config from '@/config'
import { getHeaderLogo } from '@/utilities/imageUtil'
import Link from 'next/link'
import Image from 'next/image'
import './footer.css'

function Footer() {

    const headerLogo = getHeaderLogo[config.target] || getHeaderLogo["default"]
    const hasStatisticsPage = config.hasStatisticsPage

    return (
        <div className="footer">
            <div className="footer-container middle-container">
                <div className="footer-header">
                    <Link href="/" className="footer-header-logo">
                      <Image src={headerLogo} alt="team logo" />
                    </Link>
                </div>
                <div className="footer-content-cont">
                    <div className="footer-content">
                        <Link href="/matches" className="footer-content-link">Fixtures & Results</Link>
                        <Link href="/videos" className="footer-content-link">Videos</Link>
                        {hasStatisticsPage && (
                            <Link href="/statistics" className="footer-content-link">Statistics</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer