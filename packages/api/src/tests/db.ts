import { factory, primaryKey } from '@mswjs/data';
import { randEmail, randPassword, randUuid } from '@ngneat/falso';

export const db = factory({
  account: {
    id: primaryKey(() => randUuid()),
    email: () => randEmail(),
    password: () => randPassword(),
    status: () => 'inactive' as const,
    createdAt: () => new Date().toString(),
    updatedAt: () => new Date().toString(),
  },
});
