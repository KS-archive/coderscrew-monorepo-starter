import { LanguagePicker } from './components/language-picker';
import { createTranslationsHook } from './create-translations-hook';
import { I18nProvider } from './i18n.provider';
import { i18nActions } from './store/i18n.actions';
import { i18nSelectors } from './store/i18n.selectors';

export const I18n = {
  Provider: I18nProvider,
  LanguagePicker,
  createHook: createTranslationsHook,
  selectors: i18nSelectors,
  actions: i18nActions,
};
