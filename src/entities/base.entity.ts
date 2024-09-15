import { BaseEntity, Property } from '@mikro-orm/core';

export abstract class CustomBaseEntity extends BaseEntity {
  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
