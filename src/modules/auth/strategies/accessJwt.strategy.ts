import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../types/jwtPayload.type';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@/modules/user/user.service';
import { User } from '~/src/entities';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow('JWT_SECRET'),
    });
  }

  async validate(
    payload: JwtPayload,
  ): Promise<Omit<User, 'hashedPassword'> | undefined> {
    const { id } = payload;
    const user = await this.userService.findOneRaw(id);

    if (!user) {
      throw new UnauthorizedException('Invalid or expired token.');
    }

    delete user.hashedPassword;

    return user;
  }
}
