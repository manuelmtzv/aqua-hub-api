import {
  Controller,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AccessJwtGuard } from '../auth/guards/accessJwt.guard';

@Controller('posts')
@UseGuards(AccessJwtGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Headers('authorization') authorization: string) {
    console.log(authorization);
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.findOne(id);
  }
}
