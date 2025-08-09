"use client";
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import norwegianFlag from "@/public/img/norwegian-flag.png";
import swedishFlag from "@/public/img/swedish-flag.png";
import ukFlag from "@/public/img/uk-flag.png";
import Image, { StaticImageData } from 'next/image';
import { useLocale } from 'next-intl';
import classNames from 'classnames';
import { IoMdArrowDropdown } from "react-icons/io";
import "./localeSwitcher.css";

export default function LocaleSwitcher({mobile}: {mobile?: boolean}) {

    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return
        const close = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
        }
        document.addEventListener("click", close)
        return () => document.removeEventListener("click", close)
    }, [isOpen])

    const localeToFlag: Record<string, StaticImageData> = {
        no: norwegianFlag,
        sv: swedishFlag,
        en: ukFlag
    }
    
    const handleLanguageChange = (locale: string) => {
        const segments = pathname.split('/');
        segments[1] = locale;
        const newPathname = segments.join('/');
        router.replace(newPathname);
    }

    return (
        <div ref={ref} className={classNames("locale-switcher", {"mobile": mobile})}>
            <div className="language-selection">
                <div onClick={() => setIsOpen(!isOpen)} className="language-selection-header">
                    <div className="language-selection-item-text">
                        {locale}
                    </div>
                    <div className="language-selection-item-flag">
                        <Image src={localeToFlag[locale]} alt="Norway flag" />
                    </div>
                    <div className="language-selection-arrow">
                        <IoMdArrowDropdown />                    
                    </div>
                </div>
                {isOpen && (
                     <div className="language-selection-list">
                         <div onClick={() => handleLanguageChange("no")} className={classNames("language-selection-item", {"selected": locale === "no"})}>
                             <div className="language-selection-item-text">
                                 no
                             </div>
                             <div className="language-selection-item-flag">
                                 <Image src={norwegianFlag} alt="Norway flag" />
                             </div>
                         </div>
                         <div onClick={() => handleLanguageChange("sv")} className={classNames("language-selection-item", {"selected": locale === "sv"})}>
                             <div className="language-selection-item-text">
                                 sv
                             </div>
                             <div className="language-selection-item-flag">
                                 <Image src={swedishFlag} alt="Swedish flag" />
                             </div>
                         </div>
                         <div onClick={() => handleLanguageChange("en")} className={classNames("language-selection-item", {"selected": locale === "en"})}>
                             <div className="language-selection-item-text">
                                 en
                             </div>
                             <div className="language-selection-item-flag">
                                 <Image src={ukFlag} alt="English flag" />
                             </div>
                         </div>
                  </div>
                )}
            </div>
        </div>
    );
}