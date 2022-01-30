import { ReactNode, useRef } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

import { useAsync } from '@/hooks';

import { DEFAULT_LANGUAGE, LANGUAGES } from './i18n.constants';
import { i18nSelectors } from './store/i18n.selectors';

export interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const initialized = useRef(false);
  const language = i18nSelectors.useCurrentLanguage();

  if (!initialized.current) {
    initialized.current = true;

    i18n
      .init({
        lng: language,
        fallbackLng: DEFAULT_LANGUAGE,
        load: 'languageOnly',
        interpolation: { escapeValue: false },
        resources: Object.fromEntries(LANGUAGES.map((lang) => [lang, {}])),
      })
      .catch(console.error);
  }

  useAsync(async () => {
    if (language && i18n.languages && language !== i18n.languages[0]) {
      await i18n.loadLanguages(language);
      await i18n.changeLanguage(language);
    }
  }, [language]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
