import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RefreshToken } from '@/entities';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: EntityRepository<RefreshToken>,
    private readonly em: EntityManager,
  ) {}

  async findOne(id: string): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOne({ id });
  }

  async create(userId: string): Promise<RefreshToken> {
    const refreshToken = this.refreshTokenRepository.create({
      user: userId,
      hashedToken: '',
    });

    await this.em.persistAndFlush(refreshToken);

    return refreshToken;
  }

  async update(id: string, hashedToken: string): Promise<RefreshToken> {
    const refreshToken = await this.findOne(id);

    if (refreshToken) {
      refreshToken.hashedToken = hashedToken;

      await this.em.persistAndFlush(refreshToken);
    }

    return refreshToken;
  }

  async delete(id: string): Promise<void> {
    const refreshToken = await this.findOne(id);

    if (refreshToken) {
      await this.em.remove(refreshToken).flush();
    }
  }
}
