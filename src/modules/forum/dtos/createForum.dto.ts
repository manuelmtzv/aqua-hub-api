import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateForumTranslationDto } from '.';
import { HasEnabledTranslation } from '@/shared/decorators/hasEnabledTranslation.decorator';

export class CreateForumDto {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateForumTranslationDto)
  @HasEnabledTranslation()
  translations: CreateForumTranslationDto[];

  @IsArray()
  @IsUUID('4', { each: true })
  topics: string[];
}
