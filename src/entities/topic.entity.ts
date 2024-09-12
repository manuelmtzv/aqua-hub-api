import {
  BeforeCreate,
  BeforeUpdate,
  Collection,
  Embeddable,
  Embedded,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CustomBaseEntity, Forum, Post } from '.';
import { BadRequestException } from '@nestjs/common';
import { EntityTranslation } from '@/shared/interfaces/entityTranslation.interface';
import { TranslatedEntity } from '../shared/types/TranslatedEntity';

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

  @BeforeCreate()
  beforeCreate() {
    this.validateTranslations(this);
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.validateTranslations(this);
  }

  private validateTranslations(entity: Topic) {
    if (!entity.translations.some((translation) => translation.enabled)) {
      throw new BadRequestException(
        'There must be at least one translation with "enabled" set to true.',
      );
    }
  }
}

@Embeddable()
export class TopicTranslation implements EntityTranslation {
  @Property({ type: 'text' })
  code!: string;

  @Property({ type: 'text' })
  title!: string;

  @Property({ type: 'text' })
  description!: string;

  @Property({ type: 'boolean', default: false })
  enabled: boolean = false;
}

export type TopicTranslated = TranslatedEntity<Topic, TopicTranslation>;
