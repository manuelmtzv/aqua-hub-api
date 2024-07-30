import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '@/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessJwtStrategy } from './strategies/accessJwt.strategy';
import { RefreshJwtStrategy } from './strategies';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RefreshToken } from '~/src/entities';

@Module({
  imports: [
    UserModule,
    JwtModule.register({}),
    MikroOrmModule.forFeature([RefreshToken]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy, RefreshJwtStrategy],
  exports: [AuthService, AccessJwtStrategy, RefreshJwtStrategy, JwtModule],
})
export class AuthModule {}
