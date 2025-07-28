import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import translationEN from './en/translation.json';
import translationRU from './ru/translation.json';
import translationHE from './he/translation.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(Backend)
    .init({
        backend: {
            loadPath: '/locales/{{lng}}/translation.json'
        },
        supportedLngs: ["he", "en", "ru"],
        fallbackLng: "en",
        // lng: "ru",
        debug: false,
        detection: {
            order: ['navigator', 'querystring', 'cookie', 'localStorage'],
            cache: ['localStorage']
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: translationEN
            },
            ru: {
                translation: translationRU
            },
            he: {
                translation: translationHE
            }
        }
    });

export default i18n;