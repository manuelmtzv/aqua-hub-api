import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessJwtGuard } from '~/src/shared/guards/accessJwt.guard';
import { UserPostService } from '../services/user-post.service';
import { GetUser } from '@/shared/decorators/getUser.decorator';

@Controller('users/:id/posts')
@UseGuards(AccessJwtGuard)
export class UserPostController {
  constructor(private readonly userPostService: UserPostService) {}

  @Get('')
  findUserPosts(@GetUser('id') userId: string) {
    return this.userPostService.findUserPosts(userId);
  }
}
