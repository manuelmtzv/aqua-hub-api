import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@/modules/user/user.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RefreshJwtPayload } from '../types';
import { EntityManager } from '@mikro-orm/postgresql';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly userService: UserService,
    private readonly em: EntityManager,
    private readonly i18n: I18nService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: RefreshJwtPayload) {
    const { id } = payload;
    const refreshToken = request
      .get('Authorization')
      .replace('Bearer ', '')
      .trim();
    const user = await this.userService.findOneRaw(id);

    if (!user) {
      throw new UnauthorizedException(
        this.i18n.t('errors.auth.invalidToken', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    delete user.hashedPassword;

    this.em.clear();

    return {
      user,
      tokenId: payload.tokenId,
      refreshToken,
    };
  }
}
