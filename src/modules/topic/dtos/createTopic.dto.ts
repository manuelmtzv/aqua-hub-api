import { Type } from 'class-transformer';
import {
  IsHexColor,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CreateTopicTranslationDto } from '.';

export class CreateTopicDto {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTopicTranslationDto)
  translations: CreateTopicTranslationDto[];

  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
