import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetChannel = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (data) {
      return request.channel.id;
    }

    return request.channel;
  },
);
