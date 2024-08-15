import { Type } from 'class-transformer';
import {
  IsHexColor,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CreateTopicTranslationDto } from '.';
import { HasEnabledTranslation } from '@/shared/decorators/hasEnabledTranslation.decorator';

export class CreateTopicDto {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTopicTranslationDto)
  @HasEnabledTranslation()
  translations: CreateTopicTranslationDto[];

  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
