import { Global, useTheme } from '@emotion/react';

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={{
        '@import': ['https://unpkg.com/modern-normalize@1.1.0/modern-normalize.css', 'https://rsms.me/inter/inter.css'],

        html: {
          '--main-font-family': "'Inter', sans-serif",

          '@supports (font-variation-settings: normal)': {
            '--main-font-family': "'Inter var', sans-serif",
          },
        },

        body: {
          ...theme.typography.md,
          color: theme.colors.gray[800],
          fontFamily: theme.fontFamilies.body,
          fontWeight: theme.fontWeights.normal,
        },

        '&::placeholder': {
          color: theme.colors.gray[400],
        },
      }}
    />
  );
};
