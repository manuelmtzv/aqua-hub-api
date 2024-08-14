import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity, Post } from '.';

@Entity()
export class Language extends CustomBaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  name!: string;

  @Property()
  code!: string;

  @OneToMany({ entity: () => Post, mappedBy: 'language' })
  posts = new Collection<Post>(this);
}
