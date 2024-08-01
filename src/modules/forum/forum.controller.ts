import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto, UpdateForumDto } from './dtos';

@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get()
  async findAll() {
    return this.forumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.forumService.findOne(id);
  }

  @Post()
  async create(@Body() createForumDto: CreateForumDto) {
    return this.forumService.create(createForumDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateForumDto: UpdateForumDto,
  ) {
    return this.forumService.update(id, updateForumDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.forumService.delete(id);
  }
}
