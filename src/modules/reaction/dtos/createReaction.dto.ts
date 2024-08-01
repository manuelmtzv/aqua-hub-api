import { ReactionType, reactionTypes } from '@/shared/types/Reaction';
import { IsIn, IsString } from 'class-validator';

export class CreateReactionDto {
  @IsString()
  @IsIn(reactionTypes)
  type: ReactionType;
}
