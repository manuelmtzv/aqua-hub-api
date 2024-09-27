import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from '~/src/entities';

@Injectable()
export class UserPostService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findUserPosts(userId: string) {
    const user = await this.userRepository.findOneOrFail(userId, {
      populate: ['posts'],
    });

    return user.posts;
  }
}
