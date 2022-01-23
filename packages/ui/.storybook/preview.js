import { ThemeProvider } from '../src/theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const withTheme = (Story) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

export const decorators = [withTheme];
