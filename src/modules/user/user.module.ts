import { Module } from '@nestjs/common';
import { UserController, UserService } from '.';

@Module({
  providers: [UserController],
  controllers: [UserService],
  imports: [UserService],
})
export class UserModule {}
