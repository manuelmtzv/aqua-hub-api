import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import {
  listResponse,
  type ListResponse,
} from '@/shared/functions/listResponse';
import { Post, User } from '~/src/entities';
import { UpdatePostDto } from './dtos/updatePost.dto';
import { CreatePostDto } from './dtos';
import { TypesenseProvider } from '@/modules/typesense/typesense.provider';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    private readonly em: EntityManager,
    private readonly eventEmitter: EventEmitter2,
    private readonly typesense: TypesenseProvider,
  ) {}

  async findAll(): Promise<ListResponse<Post>> {
    return listResponse(
      await this.postRepository.findAll({
        populate: ['reactions', 'topic', 'topics', 'forum'],
      }),
    );
  }

  async findOneRaw(id: string): Promise<Post | null> {
    return this.postRepository.findOne(
      { id },
      { populate: ['reactions', 'topic', 'topics', 'forum'] },
    );
  }

  async findOne(id: string): Promise<Post | null> {
    const post = await this.postRepository.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async create(user: User, data: CreatePostDto): Promise<Post> {
    const post = this.em.create(Post, {
      ...data,
      author: user,
    });

    this.eventEmitter.emit('post.created', post);

    await this.em.persistAndFlush(post);

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

  @OnEvent('post.created')
  async handlePostEvents(payload: Post): Promise<void> {
    try {
      await this.typesense.client
        .collections('posts')
        .documents()
        .create({
          ...payload,
          author: payload.author.name,
        });
    } catch (error) {
      console.error('Error indexing post', error);
    }
  }
}
