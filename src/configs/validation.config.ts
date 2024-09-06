import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { I18nValidationPipe } from 'nestjs-i18n';

export function validationConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(
          errors.map((error) => ({
            field: error.property,
            messages: Object.values(error.constraints),
          })),
        );
      },
    }),
    new I18nValidationPipe(),
  );
}
