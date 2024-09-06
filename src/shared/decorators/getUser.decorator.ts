import { User } from '@/entities';
import { RequestWithUser } from '@/shared/interfaces/RequestWithUser.interface';
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

type UserProperty = keyof InstanceType<typeof User>;

export const GetUser = createParamDecorator(
  (data: UserProperty | Array<UserProperty>, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;
    const i18n = I18nContext.current().i18n;

    if (!user) {
      throw new InternalServerErrorException(
        i18n.t('errors.user.notFoundInRequest', {
          lang: I18nContext.current().lang,
        }),
      );
    }

    if (data) {
      if (Array.isArray(data)) {
        return data.reduce((acc, key) => {
          acc[key] = user[key];
          return acc;
        }, {});
      }

      return user[data];
    }

    return user;
  },
);
