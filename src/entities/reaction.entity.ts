import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { ReactionType } from '@/shared/types/Reaction';
import { CustomBaseEntity, User, Comment, Post } from '.';

export type ReactionTarget = 'Post' | 'Comment';

@Entity()
export class Reaction extends CustomBaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ type: 'text' })
  type!: ReactionType;

  @ManyToOne({ entity: () => User })
  user!: User;

  @Property({ type: 'text' })
  targetType!: ReactionTarget;

  @ManyToOne({ entity: () => Comment, nullable: true })
  comment?: Comment;

  @ManyToOne({ entity: () => Post, nullable: true })
  post?: Post;
}
