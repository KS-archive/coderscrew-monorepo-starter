import { translationSlice } from './i18n.slice';

const useCurrentLanguage = () => translationSlice((state) => state.language);

export const i18nSelectors = { useCurrentLanguage };
