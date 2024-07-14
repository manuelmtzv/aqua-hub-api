import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity, Post } from '.';

@Entity()
export class User extends BaseEntity {
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
}
