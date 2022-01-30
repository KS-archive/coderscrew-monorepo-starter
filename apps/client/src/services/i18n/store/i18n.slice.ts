import create from 'zustand';

import { DEFAULT_LANGUAGE } from '../i18n.constants';
import type { Language } from '../i18n.types';

interface TranslationState {
  language: Language;
}

const initialState: TranslationState = {
  language: DEFAULT_LANGUAGE,
};

export const translationSlice = create(() => initialState);
