import { Module } from '@nestjs/common';
import { AuthController, AuthService } from '.';
import { UserModule } from '@/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessJwtStrategy } from './strategies/accessJwt.strategy';
import { RefreshJwtStrategy } from './strategies';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RefreshToken } from '~/src/entities';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MikroOrmModule.forFeature([RefreshToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        // secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow('JWT_EXPIRY'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessJwtStrategy, RefreshJwtStrategy],
  exports: [AuthService, AccessJwtStrategy, RefreshJwtStrategy, JwtModule],
})
export class AuthModule {}
