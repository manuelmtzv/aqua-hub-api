import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AccessJwtGuard } from '@/shared/guards/accessJwt.guard';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { CreateCommentDto } from './dtos';

@Controller('comments')
@UseGuards(AccessJwtGuard)
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @Get(':postId')
  async getComments(@Param('postId') postId: string) {
    return await this.commentsService.getPostComments(postId);
  }

  @Post(':commentId/replies')
  async createCommentReply(
    @GetUser('id') userId: string,
    @Param('commentId') commentId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.create(
      userId,
      'Comment',
      commentId,
      createCommentDto,
    );
  }

  @Patch(':commentId')
  async updateComment(
    @GetUser('id') userId: string,
    @Param('commentId') commentId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentsService.update(
      userId,
      commentId,
      createCommentDto,
    );
  }
}
