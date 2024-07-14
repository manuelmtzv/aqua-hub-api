import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { CustomBaseEntity, Post, Comment } from '.';

export type MediaTarget = 'Post' | 'Comment';

@Entity()
export class Media extends CustomBaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  url!: string;

  @Property()
  target!: MediaTarget;

  @ManyToOne({ entity: () => Post, nullable: true })
  post?: Post;

  @ManyToOne({ entity: () => Comment, nullable: true })
  comment?: Comment;
}
