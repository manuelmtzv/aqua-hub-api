import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { ForumModule } from './modules/forum/forum.module';
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
import { TypesenseModule } from './modules/typesense/typesense.module';

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
    TypesenseModule.forRoot({
      nodes: [
        {
          host: 'localhost',
          port: 8108,
          protocol: 'http',
        },
      ],
      apiKey: 'xyz',
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
