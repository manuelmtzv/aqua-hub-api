import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Topic } from '@/entities';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: EntityRepository<Topic>,
    private readonly em: EntityManager,
  ) {}
}
