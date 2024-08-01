import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Reaction, ReactionTarget } from '@/entities';
import { CreateReactionDto } from './dtos';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionRepository: EntityRepository<Reaction>,
    private readonly em: EntityManager,
  ) {}

  async create(
    userId: string,
    target: ReactionTarget,
    targetId: string,
    createReactionDto: CreateReactionDto,
  ) {
    const entity = this.defineTarget(target, targetId);

    const reaction = this.reactionRepository.create({
      user: userId,
      targetType: target,
      ...createReactionDto,
      ...entity,
    });

    await this.em.persistAndFlush(reaction);
  }

  private defineTarget(target: ReactionTarget, targetId: string) {
    switch (target) {
      case 'Post':
        return { post: targetId };
      case 'Comment':
        return { comment: targetId };
    }
  }
}
