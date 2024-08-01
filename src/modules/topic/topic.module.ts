import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Topic } from '@/entities';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

@Module({
  imports: [MikroOrmModule.forFeature([Topic])],
  controllers: [TopicController],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
