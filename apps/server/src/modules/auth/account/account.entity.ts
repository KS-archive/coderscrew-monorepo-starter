import { Entity, EntityRepositoryType, Enum, OptionalProps, Property, Unique } from '@mikro-orm/core';

import { BaseEntity, BaseEntityOptionalProps } from '@/shared/entity.base';

import { AccountRepository } from './account.repository';

export enum AccountStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
}

@Entity({ customRepository: () => AccountRepository })
export class Account extends BaseEntity {
  [OptionalProps]?: BaseEntityOptionalProps | 'status';

  [EntityRepositoryType]?: AccountRepository;

  @Property()
  @Unique()
  email: string;

  @Property()
  password: string;

  @Enum(() => AccountStatus)
  status = AccountStatus.INACTIVE;
}
