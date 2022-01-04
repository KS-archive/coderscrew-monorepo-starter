import { css, Global, useTheme } from '@emotion/react';

import type { CustomTheme } from '../theme';

const cssImports = css`
  @import url('https://rsms.me/inter/inter.css');
`;

// Source: https://github.com/elad2412/the-new-css-reset
const cssReset = css`
  *:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *)) {
    all: unset;
    display: revert;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ol,
  ul,
  menu {
    list-style: none;
  }

  img {
    max-width: 100%;
  }

  table {
    border-collapse: collapse;
  }

  textarea {
    white-space: revert;
  }

  :where([hidden]) {
    display: none;
  }

  :where([contenteditable]) {
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
  }

  :where([draggable='true']) {
    -webkit-user-drag: element;
  }
`;

const cssDefaults = (theme: CustomTheme) => css`
  html {
    --main-font-family: 'Inter', sans-serif;
    @supports (font-variation-settings: normal) {
      --main-font-family: 'Inter var', sans-serif;
    }
  }

  body {
    font-family: var(--main-font-family);
    font-size: ${theme.typography.md.fontSize};
    line-height: ${theme.typography.md.lineHeight};
    letter-spacing: ${theme.typography.md.letterSpacing};
    font-weight: ${theme.fontWeights.normal};
    color: ${theme.colors.gray[800]};
  }

  *::placeholder {
    color: ${theme.colors.gray[400]};
  }
`;

export const GlobalStyles = () => {
  const theme = useTheme();

  return <Global styles={[cssImports, cssReset, cssDefaults(theme)]} />;
};
