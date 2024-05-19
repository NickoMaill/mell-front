import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frResource from './dictionaries/fr.json';
import enResource from './dictionaries/en.json';

export const resources = {
    fr: {
        translation: frResource,
    },
    en: {
        translation: enResource,
    },
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: window.localStorage.getItem('lang'),
    fallbackLng: 'fr',
    interpolation: {
        escapeValue: false,
    },
    react: {
        transSupportBasicHtmlNodes: true,
        transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b'],
        useSuspense: true,
    },
});

export default i18n;
