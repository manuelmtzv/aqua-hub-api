import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity, User } from '.';
import { AppAbility } from '@/shared/types/appAbility.type';
import { RawRuleOf } from '@casl/ability';

@Entity()
export class Role extends CustomBaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: 'jsonb' })
  permissions: RawRuleOf<AppAbility>[] = [];

  @ManyToMany(() => User, (user) => user.roles)
  users = new Collection<User>(this);
}
