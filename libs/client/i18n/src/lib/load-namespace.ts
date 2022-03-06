import i18next from 'i18next';

import type { Namespace } from './i18n.types';

export const loadNamespace = async (ns: Namespace) => {
  if (!i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns);
  }
};
