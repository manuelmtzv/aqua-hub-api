import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../types/jwtPayload.type';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/modules/user/user.service';
import { User } from '@/entities';
import { EntityManager } from '@mikro-orm/postgresql';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly em: EntityManager,
    private readonly i18n: I18nService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(
    payload: JwtPayload,
  ): Promise<Omit<User, 'hashedPassword'> | undefined> {
    const { id } = payload;
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

    return user;
  }
}
