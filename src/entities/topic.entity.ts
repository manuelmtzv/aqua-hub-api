import {
  Collection,
  Embeddable,
  Embedded,
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

  @Embedded({ entity: () => TopicTranslation, object: true })
  translations: TopicTranslation[] = [];

  @Property({ default: '#fff' })
  color!: string;

  @ManyToMany({ entity: () => Forum, mappedBy: 'topics' })
  forums = new Collection<Forum>(this);

  @ManyToMany({ entity: () => Post, mappedBy: 'topics' })
  posts = new Collection<Post>(this);
}

@Embeddable()
export class TopicTranslation {
  @Property({ type: 'text' })
  code!: string;

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'text' })
  color!: string;

  @Property({ type: 'boolean', default: false })
  enabled: boolean = false;
}
