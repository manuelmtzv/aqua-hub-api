import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Post } from '~/src/entities';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [MikroOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
