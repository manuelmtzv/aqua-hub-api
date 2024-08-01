import { Controller } from '@nestjs/common';
import { ForumService } from './forum.service';

@Controller('forums')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}
}
