import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const supportedLngs = ['en', 'pl'] as const;

export const initializeI18nService = () => {
  i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      fallbackLng: 'en',
      load: 'languageOnly',
      supportedLngs,
      interpolation: { escapeValue: false },
    })
    .catch(console.error);
};
