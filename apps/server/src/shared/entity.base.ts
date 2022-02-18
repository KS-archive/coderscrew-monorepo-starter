import { PrimaryKey, Property } from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';

export type BaseEntityOptionalProps = 'createdAt' | 'updatedAt';

export abstract class BaseEntity {
  @PrimaryKey()
  id: string = randomUUID();

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
