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

@Embeddable()
export class Permission {
  @Property()
  action!: string;

  @Property()
  subject!: string;

  @Property({ type: 'jsonb' })
  conditions: Record<string, string> = {};
}

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
