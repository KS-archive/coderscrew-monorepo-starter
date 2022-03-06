// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./i18next.d.ts" />

export { LanguagePicker } from './lib/components/language-picker';
export { getFixedT } from './lib/get-fixed-t';
export { initializeI18nService } from './lib/i18n.config';
export { I18nProviderMock } from './lib/i18n.provider.mock';
export { loadNamespace } from './lib/load-namespace';
export { i18nActions } from './lib/store/i18n.actions';
export { i18nSelectors } from './lib/store/i18n.selectors';
export { Trans, useTranslation } from 'react-i18next';
