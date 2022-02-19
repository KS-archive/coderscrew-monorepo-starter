import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import { i18nConfig } from './i18n.config';

interface I18nProviderMockProps {
  children: ReactNode;
}

export const I18nProviderMock = ({ children }: I18nProviderMockProps) => {
  if (!i18next.isInitialized) {
    i18next
      .init({
        ...i18nConfig,
        resources: {},
      })
      .catch(console.error);
  }

  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};
