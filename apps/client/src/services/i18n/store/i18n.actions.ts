import type { Language } from '../i18n.types';
import { translationSlice } from './i18n.slice';

const setLanguage = (language: Language) => translationSlice.setState({ language });

export const i18nActions = { setLanguage };
