import '@emotion/react';

import { breakpoints } from './foundations/breakpoints';
import { colors } from './foundations/colors';
import { fontFamilies } from './foundations/font-families';
import { fontWeights } from './foundations/font-weights';
import { shadows } from './foundations/shadows';
import { typography } from './foundations/typography';

export const theme = {
  colors,
  typography,
  breakpoints,
  fontWeights,
  fontFamilies,
  shadows,
};

export type CustomTheme = typeof theme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
