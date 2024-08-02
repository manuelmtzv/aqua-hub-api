import { ReactionType, reactionTypes } from '~/src/shared/types/reaction.type';
import { IsIn, IsString } from 'class-validator';

export class CreateReactionDto {
  @IsString()
  @IsIn(reactionTypes)
  type: ReactionType;
}
