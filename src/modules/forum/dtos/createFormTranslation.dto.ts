import {
  IsNotEmpty,
  IsString,
  Min,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateForumTranslationDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Min(10)
  description: string;

  @IsBoolean()
  @IsOptional()
  enabled: boolean;
}
