import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Forum } from '@/entities';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';

@Module({
  imports: [MikroOrmModule.forFeature([Forum])],
  controllers: [ForumController],
  providers: [ForumService],
  exports: [ForumService],
})
export class ForumModule {}
