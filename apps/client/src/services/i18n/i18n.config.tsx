import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { DEFAULT_LANGUAGE, LANGUAGES } from './i18n.constants';
import type { Language } from './i18n.types';
import { i18nActions } from './store/i18n.actions';
import { translationSlice } from './store/i18n.slice';

export const initializeI18nService = () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: DEFAULT_LANGUAGE,
      load: 'languageOnly',
      interpolation: { escapeValue: false },
      resources: Object.fromEntries(LANGUAGES.map((lang) => [lang, {}])),
    })
    .then(() => {
      const currentLanguage = i18n.languages[0];

      return i18nActions.setLanguage(currentLanguage as Language);
    })
    .catch(console.error);
};

translationSlice.subscribe(
  (state) => state.language,
  (language) => {
    i18n
      .loadLanguages(language, () => {
        i18n.changeLanguage(language).catch(console.error);
      })
      .catch(console.error);
  }
);
