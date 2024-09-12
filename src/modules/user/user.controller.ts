import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { User } from '@/entities';
import { AccessJwtGuard } from '@/shared/guards/accessJwt.guard';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(AccessJwtGuard)
  getMe(@GetUser() user: User) {
    return user;
  }
}
