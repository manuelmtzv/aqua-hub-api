import {
  BeforeCreate,
  Collection,
  Entity,
  HiddenProps,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity, Post, RefreshToken, Role } from '.';
import * as argon from 'argon2';
import { AppAbility } from '@/shared/types/appAbility.type';
import { RawRuleOf } from '@casl/ability';

@Entity()
export class User extends CustomBaseEntity {
  [HiddenProps]?: 'refreshTokens';

  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  username!: string;

  @Property()
  hashedPassword!: string;

  @Property({ type: 'date' })
  birthdate!: Date;

  @Property()
  name!: string;

  @Property()
  lastname!: string;

  @ManyToMany(() => User, (user) => user.followers, { owner: true })
  following = new Collection<User>(this);

  @ManyToMany(() => User, (user) => user.following)
  followers = new Collection<User>(this);

  @ManyToMany(() => Post, (post) => post.savedBy, { owner: true })
  savedPosts = new Collection<Post>(this);

  @ManyToMany(() => Role, (role) => role.users, { owner: true })
  roles = new Collection<Role>(this);

  @OneToMany({ entity: () => Post, mappedBy: 'author' })
  posts = new Collection<Post>(this);

  @OneToMany({ entity: () => RefreshToken, mappedBy: 'user', hidden: true })
  refreshTokens = new Collection<RefreshToken>(this);

  @Property({ type: 'jsonb' })
  permissions: RawRuleOf<AppAbility>[] = [];

  @BeforeCreate()
  async hashPassword() {
    this.hashedPassword = await argon.hash(this.hashedPassword);
  }
}
