import { PartialType } from '@nestjs/swagger';
import { CreateTopicDto } from './createTopic.dto';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {}
