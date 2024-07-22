import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationConfig } from './configs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api');

  validationConfig(app);

  await app.listen(config.get('PORT') || 3000);
}
bootstrap();
