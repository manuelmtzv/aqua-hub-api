import { OmitType } from '@nestjs/swagger';
import { RegisterDto } from '../../auth/dto/register.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends OmitType(RegisterDto, ['password']) {
  @IsNotEmpty()
  @IsString()
  hashedPassword: string;
}
