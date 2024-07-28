import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from './base.entity';
import { User } from '.';

@Entity()
export class RefreshToken extends CustomBaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  hashedToken!: string;

  @ManyToOne({ entity: () => User })
  user!: User;
}
