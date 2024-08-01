import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Forum } from '@/entities';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { CreateForumDto, UpdateForumDto } from './dtos';
import {
  listResponse,
  type ListResponse,
} from '@/shared/functions/listResponse';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: EntityRepository<Forum>,
    private readonly em: EntityManager,
  ) {}

  async findAll(): Promise<ListResponse<Forum>> {
    const forums = await this.forumRepository.findAll();
    return listResponse<Forum>(forums);
  }

  async findOneRaw(id: string): Promise<Forum> {
    return this.forumRepository.findOne({ id });
  }

  async findOne(id: string): Promise<Forum> {
    const forum = await this.findOneRaw(id);

    if (!forum) {
      throw new NotFoundException('Forum not found');
    }

    return;
  }

  async create(createForumDto: CreateForumDto): Promise<Forum> {
    // TODO: Validate if topics exist.
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
