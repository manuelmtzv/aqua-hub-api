import { Controller } from '@nestjs/common';
import { TopicService } from './topic.service';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}
}
