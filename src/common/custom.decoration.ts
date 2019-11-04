import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator((data: string[], req: Request) => {
  let user = req.body;
  if (data) {
    user = data.reduce((newuser, prop) => {
      return { ...newuser, [prop]: user[prop] };
    }, {});
  }
  return user;
});
