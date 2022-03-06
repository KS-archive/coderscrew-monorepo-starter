import { useTranslation } from 'react-i18next';

import type { Language } from '../i18n.types';

const useCurrentLanguage = () => useTranslation()[1].languages[0] as Language;

export const i18nSelectors = { useCurrentLanguage };
