import { IsHexColor, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
