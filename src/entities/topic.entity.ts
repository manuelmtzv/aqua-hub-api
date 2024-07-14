import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity, Post } from '.';

@Entity()
export class Topic extends BaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  color!: string;

  @ManyToMany({ entity: () => Post, mappedBy: 'topics' })
  posts = new Collection<Post>(this);
}
