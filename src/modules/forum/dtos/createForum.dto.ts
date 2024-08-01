import { IsArray, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';

export class CreateForumDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Min(10)
  description: string;

  @IsArray()
  @IsUUID('4', { each: true })
  topics: string[];
}
