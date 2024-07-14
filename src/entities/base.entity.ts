import { BaseEntity, Property } from '@mikro-orm/core';

export abstract class CustomBaseEntity extends BaseEntity {
  @Property({ type: 'date' })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
