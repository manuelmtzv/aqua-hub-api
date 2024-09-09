import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  listResponse,
  type ListResponse,
} from '~/src/shared/utils/listResponse';
import { Post } from '~/src/entities';
import { UpdatePostDto } from './dtos/updatePost.dto';
import { CreatePostDto } from './dtos';
import { TypesenseProvider } from '@/modules/typesense/typesense.provider';
import {
  POST_CREATED_EVENT,
  PostCreatedEvent,
} from './events/postCreated.event';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    private readonly em: EntityManager,
    private readonly eventEmitter: EventEmitter2,
    private readonly typesense: TypesenseProvider,
    private readonly i18n: I18nService,
  ) {}

  async findAll(): Promise<ListResponse<Post>> {
    return listResponse(
      await this.postRepository.findAll({
        populate: [
          'topic',
          'topics',
          'forum',
          'author',
          'reactions',
          'comments',
        ],
      }),
    );
  }

  async findOneRaw(id: string): Promise<Post | null> {
    return this.postRepository.findOne(
      { id },
      {
        populate: [
          'topic',
          'topics',
          'forum',
          'author',
          'reactions',
          'comments',
        ],
      },
    );
  }

  async findOne(id: string): Promise<Post | null> {
    const post = await this.postRepository.findOne(id);

    if (!post) {
      throw new NotFoundException(
        this.i18n.t('errors.post.notFound', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    return post;
  }

  async create(userId: string, data: CreatePostDto): Promise<Post> {
    const post = this.em.create(Post, {
      ...data,
      author: userId,
    });

    await this.em.persistAndFlush(post);

    this.eventEmitter.emit(POST_CREATED_EVENT, new PostCreatedEvent(post));

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    const post = await this.findOne(id);

    post.assign(updatePostDto);
    await this.em.flush();

    return post;
  }

  async delete(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.em.removeAndFlush(post);
  }

  @OnEvent(POST_CREATED_EVENT)
  async handlePostEvents(payload: PostCreatedEvent): Promise<void> {
    try {
      const post = await this.findOneRaw(payload.post.id);

      await this.typesense.client
        .collections('posts')
        .documents()
        .create({
          ...post,
          author: post.author.name,
          forum: post.forum.translations[0].title,
          topic: post.topic.translations[0].title,
        });
    } catch (error) {
      console.error('Error indexing post', error);
    }
  }
}
