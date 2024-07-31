import { Body, Controller, Param, Post } from '@nestjs/common';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { CommentService } from '@/modules/comment/comment.service';
import { CreateCommentDto } from '@/modules/comment/dtos';

@Controller('posts/:postId/comments')
export class PostCommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createPostComment(
    @Param('postId') postId: string,
    @GetUser('id') userId: string,
    @Body() createComment: CreateCommentDto,
  ) {
    return this.commentService.create(userId, 'post', postId, createComment);
  }
}
