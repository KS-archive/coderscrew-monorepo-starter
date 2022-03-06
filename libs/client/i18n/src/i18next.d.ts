import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      auth: typeof import('./assets/locales/en/auth.json');
      dashboard: typeof import('./assets/locales/en/dashboard.json');
      translation: typeof import('./assets/locales/en/translation.json');
    };
  }
}
