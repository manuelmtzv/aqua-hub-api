import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateForumTranslationDto } from '.';

export class CreateForumDto {
  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateForumTranslationDto)
  translations: CreateForumTranslationDto[];

  @IsArray()
  @IsUUID('4', { each: true })
  topics: string[];
}
