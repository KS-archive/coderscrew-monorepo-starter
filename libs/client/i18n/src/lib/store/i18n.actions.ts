import i18next from 'i18next';

import type { Language } from '../i18n.types';

const setCurrentLanguage = (language: Language) => i18next.changeLanguage(language);

export const i18nActions = { setCurrentLanguage };
