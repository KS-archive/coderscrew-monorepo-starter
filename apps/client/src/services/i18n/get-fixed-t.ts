import type { KeyPrefix, TFunction } from 'react-i18next';
import i18next from 'i18next';

import type { Namespace } from './i18n.types';

export const getFixedT = async <Ns extends Namespace, TKPrefix extends KeyPrefix<Ns> = undefined>(
  ns: Ns,
  options?: { keyPrefix?: TKPrefix }
): Promise<TFunction<Ns, TKPrefix>> => {
  if (!i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns);
  }

  return i18next.getFixedT(i18next.languages, ns, options?.keyPrefix);
};
