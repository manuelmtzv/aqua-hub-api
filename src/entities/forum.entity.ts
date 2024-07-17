import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity } from './base.entity';
import { Topic } from './topic.entity';
import { Post } from './post.entity';

@Entity()
export class Forum extends CustomBaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @OneToMany({ entity: () => Post, mappedBy: 'forum' })
  posts = new Collection<Post>(this);

  @ManyToMany({ entity: () => Topic, inversedBy: 'forums' })
  topics = new Collection<Topic>(this);
}
