import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ExpressRequestInterface } from './interfaces/ExpressRequest.interface';
import { UserService } from 'src/user/user.service';

const jwtSecretKey = 'superSecret';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodeToken = verify(token, jwtSecretKey);
      const user = await this.userService.findOne(decodeToken['id']);
      req.user = user;
    } catch (err) {
      req.user = null;
    }
    next();
  }
}
