import {
  Collection,
  Embeddable,
  Embedded,
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

  @Embedded({ entity: () => ForumTranslation, object: true })
  translations: ForumTranslation[] = [];

  @OneToMany({ entity: () => Post, mappedBy: 'forum' })
  posts = new Collection<Post>(this);

  @ManyToMany({ entity: () => Topic, inversedBy: 'forums' })
  topics = new Collection<Topic>(this);
}

@Embeddable()
export class ForumTranslation {
  @Property({ type: 'text' })
  code!: string;

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'boolean', default: false })
  enabled: boolean = false;
}
