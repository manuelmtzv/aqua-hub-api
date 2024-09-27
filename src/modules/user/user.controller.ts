import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { User } from '@/entities';
import { AccessJwtGuard } from '@/shared/guards/accessJwt.guard';

@Controller('users')
@UseGuards(AccessJwtGuard)
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
