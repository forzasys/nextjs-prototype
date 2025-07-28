import { useLocale } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';
import NorwayFlag from "@/public/img/norway-flag.png";
import EnglishFlag from "@/public/img/united-kingdom-flag.png";
import Image from 'next/image';

export default function LocaleSwitcher() {

    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    
    const handleLanguageChange = (locale: string) => {
        console.log("locale", locale)
        // Create the new pathname with the new locale
        const segments = pathname.split('/');
        segments[1] = locale; // Replace the locale segment
        const newPathname = segments.join('/');
        
        router.replace(newPathname);
    }
    return (
        <div className="header-top-languages">
            <div className="language-selection-title">Language</div>
            <Image src={NorwayFlag} onClick={() => handleLanguageChange("no")} alt="Norway flag" className="language-selection-flag"/>
            <Image src={EnglishFlag} onClick={() => handleLanguageChange("en")} alt="English flag" className="language-selection-flag"/>
        </div>
    );
}