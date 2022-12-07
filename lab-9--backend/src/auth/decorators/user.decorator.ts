import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequestInterface } from '../interfaces/ExpressRequest.interface';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req: ExpressRequestInterface = ctx.switchToHttp().getRequest();

  if (!req.user) {
    return null;
  }
  if (data) {
    return req.user[data];
  }
  return req.user;
});
