import { I18n } from '@/services/i18n';

import en from './en.json';
import pl from './pl.json';
import ru from './ru.json';

export const useDashboardTranslations = I18n.createHook('dashboard', { en, pl, ru });
