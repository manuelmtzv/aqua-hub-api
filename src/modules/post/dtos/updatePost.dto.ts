import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './createPost.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}
