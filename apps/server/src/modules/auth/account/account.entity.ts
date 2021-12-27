import { Entity, EntityRepositoryType, Enum, Property, Unique } from '@mikro-orm/core';

import { BaseEntity } from '@/shared/entity.base';

import type { AccountRepository } from './account.repository';

export enum AccountStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
}

@Entity()
export class Account extends BaseEntity {
  [EntityRepositoryType]?: AccountRepository;

  @Property()
  @Unique()
  email: string;

  @Property()
  password: string;

  @Enum(() => AccountStatus)
  status = AccountStatus.INACTIVE;
}
