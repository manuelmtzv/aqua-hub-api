import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity } from './base.entity';
import { User, Topic, Reaction, Media, Forum, Language, Comment } from '.';

@Entity()
export class Post extends CustomBaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  title!: string;

  @Property({ type: 'text' })
  content!: string;

  @ManyToOne({ entity: () => Topic })
  topic!: Topic;

  @ManyToOne({ entity: () => User })
  author!: User;

  @ManyToOne({ entity: () => Forum })
  forum!: Forum;

  @ManyToMany({ entity: () => User, mappedBy: 'savedPosts' })
  savedBy = new Collection<User>(this);

  @ManyToMany({ entity: () => Topic, inversedBy: 'posts', owner: true })
  topics = new Collection<Topic>(this);

  @ManyToOne({ entity: () => Language })
  language!: Language;

  @OneToMany({ entity: () => Reaction, mappedBy: 'post' })
  reactions = new Collection<Reaction>(this);

  @OneToMany({ entity: () => Comment, mappedBy: 'post' })
  comments = new Collection<Comment>(this);

  @OneToMany({ entity: () => Media, mappedBy: 'post' })
  media = new Collection<Media>(this);
}
