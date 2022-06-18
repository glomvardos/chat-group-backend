import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (data) {
      return request.user.id;
    }

    return {
      id: request.user.id,
      email: request.user.email,
      firstName: request.user.firstName,
      lastName: request.user.lastName,
    };
  },
);
