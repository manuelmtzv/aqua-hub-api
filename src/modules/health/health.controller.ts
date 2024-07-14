import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      message: 'API is running',
      timestamp: new Date().toISOString,
    };
  }
}
