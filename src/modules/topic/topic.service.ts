import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Topic, TopicTranslated, TopicTranslation } from '@/entities';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { listResponse, ListResponse } from '@/shared/utils/listResponse';
import { CreateTopicDto, UpdateTopicDto } from './dtos';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { translateEntities } from '@/shared/utils/translatedEntity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: EntityRepository<Topic>,
    private readonly em: EntityManager,
    private readonly i18n: I18nService,
  ) {}

  async findAll(): Promise<ListResponse<TopicTranslated>> {
    const topics = await this.topicRepository.findAll();

    const translatedTopics = translateEntities<TopicTranslation, Topic>(
      I18nContext.current().lang,
      topics,
    );

    return listResponse<TopicTranslated>(translatedTopics);
  }

  async findOneRaw(id: string): Promise<Topic> {
    return this.topicRepository.findOne({ id });
  }

  async findOne(id: string): Promise<Topic> {
    const topic = await this.findOne(id);

    if (!topic) {
      throw new NotFoundException(
        this.i18n.t('errors.topic.notFound', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return topic;
  }

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const topic = this.topicRepository.create(createTopicDto);
    await this.em.persistAndFlush(topic);

    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    const topic = await this.findOne(id);
    const changes = { ...topic, ...updateTopicDto };

    this.topicRepository.assign(topic, changes);
    await this.em.persistAndFlush(topic);

    return topic;
  }

  async delete(id: string): Promise<void> {
    const topic = await this.findOne(id);
    this.em.removeAndFlush(topic);
  }
}
