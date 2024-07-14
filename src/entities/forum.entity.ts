import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './base.entity';

@Entity()
export class Forum extends CustomBaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;
}
