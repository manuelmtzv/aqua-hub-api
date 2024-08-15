/* eslint-disable @typescript-eslint/ban-types */
import { registerDecorator, ValidationOptions } from 'class-validator';

export function HasEnabledTranslation(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'hasEnabledTranslation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!Array.isArray(value)) {
            return false;
          }

          return value.some((translation) => translation.enabled === true);
        },

        defaultMessage() {
          return 'There must be at least one translation with "enabled" set to true.';
        },
      },
    });
  };
}
