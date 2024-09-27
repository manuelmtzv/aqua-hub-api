import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { UserController, UserService } from '.';
import { User } from '@/entities/user.entity';
import { UserPostController } from './controllers/user-post.controller';
import { UserPostService } from './services/user-post.service';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController, UserPostController],
  providers: [UserService, UserPostService],
  exports: [UserService],
})
export class UserModule {}
