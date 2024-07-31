import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorators/getUser.decorator';
import { User } from '~/src/entities';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe(@GetUser() user: User) {
    return user;
  }
}
