import { Body, Controller, Param, Post } from '@nestjs/common';
import { PostService } from '../post.service';
import { CreateReactionDto } from '@/modules/reaction/dtos';
import { ReactionService } from '@/modules/reaction/reaction.service';
import { GetUser } from '@/shared/decorators/getUser.decorator';

@Controller('posts/:postId/reactions')
export class PostReactionController {
  constructor(
    private readonly postService: PostService,
    private readonly reactionService: ReactionService,
  ) {}

  @Post()
  async createPostReaction(
    @Param('postId') postId: string,
    @GetUser('id') userId: string,
    @Body() createReactionDto: CreateReactionDto,
  ) {
    await this.postService.findOne(postId);

    return this.reactionService.create(
      userId,
      'Post',
      postId,
      createReactionDto,
    );
  }
}
