import type { KeyPrefix, TFunction } from 'react-i18next';
import i18next from 'i18next';

import type { Namespace } from './i18n.types';
import { loadNamespace } from './load-namespace';

export const getFixedT = async <Ns extends Namespace, TKPrefix extends KeyPrefix<Ns> = undefined>(
  ns: Ns,
  options?: { keyPrefix?: TKPrefix }
): Promise<TFunction<Ns, TKPrefix>> => {
  await loadNamespace(ns);

  return i18next.getFixedT(i18next.languages, ns, options?.keyPrefix);
};
