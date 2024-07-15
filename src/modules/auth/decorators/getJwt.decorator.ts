import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetJwt = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers.authorization.split(' ').at(-1) as string;

    return jwt;
  },
);
