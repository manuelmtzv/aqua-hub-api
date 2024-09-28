import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '@/shared/decorators/getUser.decorator';
import { AccessJwtGuard } from '@/shared/guards/accessJwt.guard';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AccessJwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@GetUser('id') userId: string) {
    return this.userService.findMe(userId);
  }
}
