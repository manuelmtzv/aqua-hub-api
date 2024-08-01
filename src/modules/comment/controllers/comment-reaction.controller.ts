import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from '../comment.service';
import { ReactionService } from '@/modules/reaction/reaction.service';
import { AccessJwtGuard } from '@/shared/guards/accessJwt.guard';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { CreateReactionDto } from '@/modules/reaction/dtos';

@Controller('comments/:commentId/reactions')
@UseGuards(AccessJwtGuard)
export class CommentReactionController {
  constructor(
    private readonly commentService: CommentService,
    private readonly reactionService: ReactionService,
  ) {}

  @Post()
  async createCommentReaction(
    @Param('commentId') commentId: string,
    @GetUser('id') userId: string,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    await this.commentService.findOne(commentId);

    return this.reactionService.create(
      userId,
      'Comment',
      commentId,
      createReactionDto,
    );
  }
}
