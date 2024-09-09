import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Forum, ForumTranslated } from '@/entities';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { CreateForumDto, UpdateForumDto } from './dtos';
import {
  listResponse,
  type ListResponse,
} from '~/src/shared/utils/listResponse';
import { TopicService } from '@/modules/topic/topic.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { translateEntities } from '~/src/shared/utils/translatedEntity';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: EntityRepository<Forum>,
    private readonly em: EntityManager,
    private readonly topicService: TopicService,
    private readonly i18n: I18nService,
  ) {}

  async findAll(): Promise<ListResponse<ForumTranslated>> {
    const forums = await this.forumRepository.findAll();

    console.log(JSON.stringify(forums, null, 2));

    const translatedTopics = translateEntities(
      I18nContext.current().lang,
      forums,
    );

    return listResponse<ForumTranslated>(translatedTopics);
  }

  async findOneRaw(id: string): Promise<Forum> {
    return this.forumRepository.findOne({ id });
  }

  async findOne(id: string): Promise<Forum> {
    const forum = await this.findOneRaw(id);

    if (!forum) {
      throw new NotFoundException(
        this.i18n.t('errors.forum.notFound', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return;
  }

  async create(createForumDto: CreateForumDto): Promise<Forum> {
    if (createForumDto.topics && createForumDto.topics.length > 0) {
      const topics = await Promise.all(
        createForumDto.topics.map((topicId) =>
          this.topicService.findOneRaw(topicId),
        ),
      );

      if (topics.includes(null)) {
        throw new NotFoundException(
          this.i18n.t('errors.topic.notFound', {
            lang: I18nContext.current().lang,
          }),
        );
      }

      createForumDto.topics = topics.map((topic) => topic.id);
    }

    const forum = this.forumRepository.create(createForumDto);
    await this.em.persistAndFlush(forum);

    return forum;
  }

  async update(id: string, updateForumDto: UpdateForumDto): Promise<Forum> {
    const forum = await this.findOne(id);
    const changes = { ...forum, ...updateForumDto };

    this.forumRepository.assign(forum, changes);
    await this.em.persistAndFlush(forum);

    return forum;
  }

  async delete(id: string): Promise<void> {
    const forum = await this.findOne(id);
    this.em.removeAndFlush(forum);
  }
}
