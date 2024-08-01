import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  listResponse,
  type ListResponse,
} from '@/shared/functions/listResponse';
import { Post } from '~/src/entities';
import { UpdatePostDto } from './dtos/updatePost.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    private readonly em: EntityManager,
  ) {}

  async findAll(): Promise<ListResponse<Post>> {
    return listResponse(await this.postRepository.findAll());
  }

  async findOneRaw(id: string): Promise<Post | null> {
    return this.postRepository.findOne({ id });
  }

  async findOne(id: string): Promise<Post | null> {
    const post = await this.postRepository.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

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
}
