import 'react-i18next';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      auth: typeof import('../../../public/locales/en/auth.json');
      dashboard: typeof import('../../../public/locales/en/dashboard.json');
      translation: typeof import('../../../public/locales/en/translation.json');
    };
  }
}
