import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Forum } from '@/entities';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: EntityRepository<Forum>,
    private readonly em: EntityManager,
  ) {}
}
