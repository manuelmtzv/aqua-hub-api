import {
  BeforeCreate,
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity, Post } from '.';
import * as argon from 'argon2';

@Entity()
export class User extends CustomBaseEntity {
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

  @OneToMany({ entity: () => Post, mappedBy: 'author' })
  posts = new Collection<Post>(this);

  @BeforeCreate()
  async hashPassword() {
    this.hashedPassword = await argon.hash(this.hashedPassword);
  }
}
