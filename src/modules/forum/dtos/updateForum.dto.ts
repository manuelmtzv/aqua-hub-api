import { PartialType } from '@nestjs/swagger';
import { CreateForumDto } from './createForum.dto';

export class UpdateForumDto extends PartialType(CreateForumDto) {}
