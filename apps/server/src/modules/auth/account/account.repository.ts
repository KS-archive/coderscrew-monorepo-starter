import { EntityRepository } from '@mikro-orm/postgresql';

import type { Account } from './account.entity';

export class AccountRepository extends EntityRepository<Account> {}
