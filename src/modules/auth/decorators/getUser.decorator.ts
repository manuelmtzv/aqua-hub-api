import { User } from '@/entities';
import { RequestWithUser } from '@/shared/interfaces/RequestWithUser.interface';
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

type UserProperty = keyof InstanceType<typeof User>;

export const GetUser = createParamDecorator(
  (data: UserProperty | Array<UserProperty>, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new InternalServerErrorException(
        'User not found in request context.',
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
