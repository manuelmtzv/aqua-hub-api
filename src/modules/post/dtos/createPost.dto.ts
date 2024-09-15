import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  language: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  topic: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  forum: string;
}
