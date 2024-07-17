import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity, Forum, Post } from '.';

@Entity()
export class Topic extends CustomBaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property({ default: '#fff' })
  color!: string;

  @ManyToMany({ entity: () => Forum, mappedBy: 'topics' })
  forums = new Collection<Forum>(this);

  @ManyToMany({ entity: () => Post, mappedBy: 'topics' })
  posts = new Collection<Post>(this);
}
