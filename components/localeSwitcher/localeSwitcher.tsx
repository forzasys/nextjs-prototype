import { usePathname, useRouter } from 'next/navigation';
import norwegianFlag from "@/public/img/norwegian-flag.png";
import swedishFlag from "@/public/img/swedish-flag.png";
import ukFlag from "@/public/img/uk-flag.png";
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function LocaleSwitcher() {

    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations();
    
    const handleLanguageChange = (locale: string) => {
        const segments = pathname.split('/');
        segments[1] = locale;
        const newPathname = segments.join('/');
        router.replace(newPathname);
    }
    return (
        <div className="header-top-languages">
            <div className="language-selection-title">{t("language")}</div>
            <Image src={norwegianFlag} onClick={() => handleLanguageChange("no")} alt="Norway flag" className="language-selection-flag"/>
            <Image src={swedishFlag} onClick={() => handleLanguageChange("sv")} alt="Swedish flag" className="language-selection-flag"/>
            <Image src={ukFlag} onClick={() => handleLanguageChange("en")} alt="English flag" className="language-selection-flag"/>
        </div>
    );
}