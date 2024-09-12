import {
  BeforeCreate,
  BeforeUpdate,
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
import { BadRequestException } from '@nestjs/common';
import { EntityTranslation } from '@/shared/interfaces/entityTranslation.interface';
import { TranslatedEntity } from '../shared/types/TranslatedEntity';

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

  @BeforeCreate()
  beforeCreate() {
    this.validateTranslations(this);
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.validateTranslations(this);
  }

  private validateTranslations(entity: Forum) {
    if (!entity.translations.some((translation) => translation.enabled)) {
      throw new BadRequestException(
        'There must be at least one translation with "enabled" set to true.',
      );
    }
  }
}

@Embeddable()
export class ForumTranslation implements EntityTranslation {
  @Property({ type: 'text' })
  code!: string;

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'boolean', default: false })
  enabled: boolean = false;
}

export type ForumTranslated = TranslatedEntity<Forum, ForumTranslation>;
