import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { User } from '~/src/entities';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async findOneRaw(identifier: string): Promise<User | undefined> {
    const query = isUUID(identifier)
      ? { id: identifier }
      : { $or: [{ email: identifier }, { username: identifier }] };

    return this.userRepository.findOne(query, {
      populate: ['roles'],
      disableIdentityMap: true,
    });
  }

  async findOne(identifier: string): Promise<User> {
    const user = await this.findOneRaw(identifier);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(userDto);

    await this.em.persistAndFlush(user);

    return user;
  }
}
