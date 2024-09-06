import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { InjectRepository } from '@mikro-orm/nestjs';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { I18nService, I18nContext } from 'nestjs-i18n';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';

import { UserService } from '../user';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshToken, User } from '@/entities';
import type { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: EntityRepository<RefreshToken>,
    private readonly em: EntityManager,
    private readonly config: ConfigService,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async validateUser(identifier: string, password: string) {
    const user = await this.usersService.findOne(identifier);

    const badRequestMessage = this.i18n.t('errors.auth.badRequest', {
      lang: I18nContext.current().lang,
    });

    if (!user) return new BadRequestException(badRequestMessage);

    const valid = argon.verify(user.hashedPassword, password);

    if (!valid) return new BadRequestException(badRequestMessage);

    return null;
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<Tokens & { data: Partial<User> }> {
    let foundUser = await this.usersService.findOneRaw(registerDto.email);

    if (foundUser) {
      throw new BadRequestException('This email is already in use.');
    }

    foundUser = await this.usersService.findOneRaw(registerDto.username);

    if (foundUser) {
      throw new BadRequestException('This username is already in use.');
    }

    const user = await this.usersService.create({
      ...registerDto,
      hashedPassword: registerDto.password,
    });

    const tokens = await this.generateJwtTokens({ id: user.id });

    delete user.hashedPassword;

    return {
      data: user,
      ...tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<Tokens & { data: Partial<User> }> {
    const user = await this.usersService.findOne(loginDto.identifier);

    if (!user) {
      throw new BadRequestException('Email or password are incorrect');
    }

    const valid = await argon.verify(user.hashedPassword, loginDto.password);

    if (!valid) {
      throw new BadRequestException('Email or password are incorrect');
    }

    const tokens = await this.generateJwtTokens({ id: user.id });

    delete user.hashedPassword;

    return {
      data: user,
      ...tokens,
    };
  }

  async logout(tokenId: string): Promise<void> {
    const refreshToken = await this.refreshTokenRepository.findOne(tokenId);

    if (refreshToken) {
      this.em.removeAndFlush(refreshToken);
    }
  }

  async updateRefreshToken(
    user: User,
    tokenId: string,
    refreshToken: string,
  ): Promise<Tokens & { data: User }> {
    const refreshTokenEntity =
      await this.refreshTokenRepository.findOne(tokenId);

    if (!refreshTokenEntity) {
      throw new BadRequestException('Invalid or disabled refresh token');
    }

    const valid = await argon.verify(
      refreshTokenEntity.hashedToken,
      refreshToken,
    );

    if (!valid) {
      throw new BadRequestException('Invalid or disabled refresh token');
    }

    return {
      data: user,
      refreshToken,
      accessToken: await this.generateAccessToken(user.id),
      expiresIn: this.config.getOrThrow('JWT_EXPIRY'),
    };
  }

  private async generateJwtTokens({ id }: { id: string }): Promise<Tokens> {
    const tokens: Tokens = {
      accessToken: '',
      refreshToken: '',
      expiresIn: '',
    };

    const refreshExpiresAt = new Date();
    refreshExpiresAt.setSeconds(
      refreshExpiresAt.getSeconds() +
        Number(this.config.getOrThrow('JWT_REFRESH_EXPIRY')),
    );

    await this.em.transactional(async (em) => {
      const refreshToken = em.create(RefreshToken, {
        id: uuid(),
        user: id,
        expiresAt: refreshExpiresAt,
      });

      const [accessToken, generatedRefreshToken] = await Promise.all([
        this.generateAccessToken(id),
        this.generateRefreshToken(id, refreshToken.id),
      ]);

      tokens.accessToken = accessToken;
      tokens.refreshToken = generatedRefreshToken;

      refreshToken.hashedToken = await argon.hash(tokens.refreshToken);

      await em.persistAndFlush(refreshToken);
    });

    return {
      ...tokens,
      expiresIn: this.config.getOrThrow('JWT_EXPIRY'),
    };
  }

  private async generateAccessToken(id: string): Promise<string> {
    return this.jwtService.signAsync(
      { id },
      {
        secret: this.config.getOrThrow<string>('JWT_SECRET'),
        expiresIn: parseInt(this.config.getOrThrow('JWT_EXPIRY')),
      },
    );
  }

  private async generateRefreshToken(
    id: string,
    tokenId: string,
  ): Promise<string> {
    return this.jwtService.signAsync(
      { id, tokenId },
      {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: parseInt(this.config.getOrThrow('JWT_REFRESH_EXPIRY')),
      },
    );
  }
}
