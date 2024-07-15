import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationConfig } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  validationConfig(app);

  await app.listen(3000);
}
bootstrap();
