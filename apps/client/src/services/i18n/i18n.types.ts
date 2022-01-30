export type Language = typeof import('./i18n.constants').LANGUAGES[number];

export type DefaultLanguage = typeof import('./i18n.constants').DEFAULT_LANGUAGE;

export type TranslationResources = Record<Language, Record<string, string>>;
