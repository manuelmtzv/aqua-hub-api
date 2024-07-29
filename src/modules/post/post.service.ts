import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Post } from '~/src/entities';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    private readonly em: EntityManager,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postRepository.findOne({ id });
  }
}
