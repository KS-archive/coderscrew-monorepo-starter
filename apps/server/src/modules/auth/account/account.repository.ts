import { Repository } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';

import { Account } from './account.entity';

@Repository(Account)
export class AccountRepository extends EntityRepository<Account> {}
