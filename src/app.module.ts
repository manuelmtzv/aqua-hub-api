import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { ForumModule } from './modules/forum/forum.module';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import mikroOrmConfig from '~/mikro-orm.config';
import * as path from 'path';

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
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
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
