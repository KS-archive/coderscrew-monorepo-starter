import { createTranslationsHook } from '@/services/i18n';

import en from './en.json';
import pl from './pl.json';
import ru from './ru.json';

export const useDashboardTranslations = createTranslationsHook('dashboard', { en, pl, ru });
