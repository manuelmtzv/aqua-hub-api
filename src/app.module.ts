import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';

import mikroOrmConfig from '~/mikro-orm.config';
import {
  AuthModule,
  HealthModule,
  UserModule,
  MediaModule,
  PostModule,
  CommentModule,
} from '@/modules';
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        ...mikroOrmConfig,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    HealthModule,
    UserModule,
    MediaModule,
    PostModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
