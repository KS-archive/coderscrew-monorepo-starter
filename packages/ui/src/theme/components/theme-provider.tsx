import { memo, ReactElement } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import { theme } from '../theme';
import { GlobalStyles } from './global-styles';

interface ThemeProviderProperties {
  children: ReactElement;
}

export const ThemeProvider = memo(({ children }: ThemeProviderProperties) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </EmotionThemeProvider>
  );
});
