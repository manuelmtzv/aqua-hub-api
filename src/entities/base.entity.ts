import { BaseEntity as MikroBaseEntity, Property } from '@mikro-orm/core';

export abstract class BaseEntity extends MikroBaseEntity {
  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
