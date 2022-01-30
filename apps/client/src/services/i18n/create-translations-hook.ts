import { useTranslation as i18nUseTranslation, UseTranslationOptions } from 'react-i18next';
import i18n, { Callback, TOptionsBase } from 'i18next';

import { DEFAULT_LANGUAGE } from './i18n.constants';
import type { DefaultLanguage, Language, TranslationResources } from './i18n.types';

type IntlReturnType<Translation extends TranslationResources> = {
  t: (key: keyof Translation[DefaultLanguage], options?: TOptionsBase | Record<string, string | number>) => string;
  i18n: Omit<typeof i18n, 'changeLanguage'> & {
    changeLanguage: (language: Language, callback?: Callback | undefined) => void;
  };
};

export const createTranslationsHook = <Translation extends TranslationResources>(
  name: string,
  translations: Translation
) => {
  return (options?: UseTranslationOptions): IntlReturnType<Translation> => {
    if (!i18n.hasResourceBundle(DEFAULT_LANGUAGE, name)) {
      for (const lang of Object.keys(translations)) {
        i18n.addResourceBundle(lang, name, translations[lang as Language], true, true);
      }
    }

    return i18nUseTranslation(name, options);
  };
};
