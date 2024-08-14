import { IsNotEmpty, IsString, Min } from 'class-validator';

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
}
