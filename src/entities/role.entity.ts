import {
  Collection,
  Embeddable,
  Embedded,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from '.';
import { Action, Subject } from '@/shared/types/appAbility.type';

@Entity()
export class Role {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Embedded(() => Permission, { array: true })
  permissions: Permission[] = [];

  @ManyToMany(() => User, (user) => user.roles)
  users = new Collection<User>(this);
}

@Embeddable()
export class Permission {
  @Property()
  action!: Action;

  @Property()
  subject!: Subject;

  @Property({ type: 'jsonb' })
  conditions: Record<string, string> = {};
}
