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
  ReactionModule,
  TopicModule,
} from '@/modules';
import { ForumModule } from './modules/forum/forum.module';
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
    ReactionModule,
    TopicModule,
    ForumModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
