import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { PersonSessionModel } from '../domain';

export const Person = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PersonSessionModel | undefined => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
