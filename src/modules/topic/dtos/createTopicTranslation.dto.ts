import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateTopicTranslationDto {
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
