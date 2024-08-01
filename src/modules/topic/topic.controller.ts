import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto, UpdateTopicDto } from './dtos';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  async findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    return this.topicService.findOne(id);
  }

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @Patch(':id')
  async update(@Param() id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(id, updateTopicDto);
  }

  @Delete(':id')
  async delete(@Param() id: string) {
    return this.topicService.delete(id);
  }
}
