import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
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
