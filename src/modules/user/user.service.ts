import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from '~/src/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOneOrFail({ id });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
