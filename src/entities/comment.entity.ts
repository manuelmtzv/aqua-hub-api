import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Post, Reaction, User, Media } from '.';

export type CommentTarget = 'Post' | 'Comment';

@Entity()
export class Comment {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  content!: string;

  @Property({ type: 'text' })
  target!: CommentTarget;

  @ManyToOne({ entity: () => Comment, nullable: true })
  replyTo?: Comment = null;

  @ManyToOne({ entity: () => User })
  author!: User;

  @ManyToOne({ entity: () => Post })
  post!: Post;

  @OneToMany({ entity: () => Comment, mappedBy: 'replyTo' })
  replies = new Collection<Comment>(this);

  @OneToMany({ entity: () => Reaction, mappedBy: 'comment' })
  reactions = new Collection<Reaction>(this);

  @OneToMany({ entity: () => Media, mappedBy: 'comment' })
  media = new Collection<Media>(this);
}
