import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Comment } from '@/entities';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentReactionController } from './controllers';
import { ReactionModule } from '@/modules/reaction/reaction.module';

@Module({
  imports: [MikroOrmModule.forFeature([Comment]), ReactionModule],
  controllers: [CommentController, CommentReactionController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
