import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Reaction } from '~/src/entities';
import { ReactionService } from './reaction.service';

@Module({
  imports: [MikroOrmModule.forFeature([Reaction])],
  providers: [ReactionService],
  exports: [ReactionService],
})
export class ReactionModule {}
