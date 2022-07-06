import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enLocale from './locales/en.json';
import vnLocale from './locales/vn.json';

const resources = {
    vn: {
        translation: { ...vnLocale },
    },
    en: {
        translation: { ...enLocale },
    },
};
const defaultLocale = 'vn';
i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: defaultLocale,
        fallbackLng: defaultLocale,
        debug: true,
        lowerCaseLng: true,

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
