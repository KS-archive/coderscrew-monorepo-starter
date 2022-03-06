import { ThemeProvider } from '../src';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

const withTheme = (Story) => (
  <ThemeProvider>
    <Story />
  </ThemeProvider>
);

export const decorators = [withTheme];
