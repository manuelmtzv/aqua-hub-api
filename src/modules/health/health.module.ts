import { Module } from '@nestjs/common';
import { HealthController } from '.';

@Module({
  controllers: [HealthController],
})
export class HealthModule {}
