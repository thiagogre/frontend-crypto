import { useEffect, useState } from "react";

import en from "../assets/i18n/en.json";
import pt from "../assets/i18n/pt.json";

type I18nType = {
    [key: string]: {
        [key: string]: string;
    };
};

export const useTranslate = (currentLanguage?: string) => {
    const [language, setLanguage] = useState(currentLanguage || "en");
    const i18n: I18nType = { en, pt };

    useEffect(() => {
        currentLanguage = language || "en";
    }, [language]);

    const translate = (key: string) => i18n[language][key] || key;

    return { translate, setLanguage };
};
