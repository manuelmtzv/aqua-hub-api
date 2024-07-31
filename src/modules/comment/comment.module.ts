import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Comment } from '~/src/entities';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [MikroOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
