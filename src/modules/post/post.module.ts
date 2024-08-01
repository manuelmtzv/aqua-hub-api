import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Post } from '~/src/entities';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostCommentController, PostReactionController } from './controllers';
import { CommentModule } from '@/modules/comment/comment.module';
import { ReactionModule } from '@/modules/reaction/reaction.module';

@Module({
  imports: [MikroOrmModule.forFeature([Post]), CommentModule, ReactionModule],
  controllers: [PostController, PostCommentController, PostReactionController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
