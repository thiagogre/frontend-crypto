import en from '../assets/i18n/en.json';
import pt from '../assets/i18n/pt.json';

type I18nType = {
    [key: string]: {
        [key: string]: string;
    };
};

export const useTranslate = (lang: string) => {
    const i18n: I18nType = { en, pt };

    const translate = (key: string) => i18n[lang][key] || key;

    return { translate };
};
