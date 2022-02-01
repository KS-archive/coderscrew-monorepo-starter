import type { DefaultResources } from 'react-i18next';

import { supportedLngs } from './i18n.config';

export type Language = typeof supportedLngs[number];

export type Namespace = keyof DefaultResources;
