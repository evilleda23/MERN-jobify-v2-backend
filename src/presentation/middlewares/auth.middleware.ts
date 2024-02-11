import { NextFunction, Request, Response } from 'express';
import { JWTAdapter } from '../../config';
import { UserEntity } from '../../domain';
import { HttpResponse } from '../shared';
import { UserService } from '../services';
import { envs } from '../../config';
import { jwtSourceTypes } from '../../domain/constants';
import colors from 'colors';
export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const token = AuthMiddleware.extractToken(req);
    if (!token) return HttpResponse.create(res, 401, 'auth.invalidToken');
    try {
      const payload = await JWTAdapter.verify<{ id: string }>(token);

      if (!payload) return HttpResponse.create(res, 401, 'auth.invalidToken');
      const userService = new UserService();
      const userId = parseInt(payload.id);
      if (!userId) return HttpResponse.create(res, 401, 'auth.invalidToken');
      const user = await userService.findById(userId);
      if (!user) return HttpResponse.create(res, 401, 'auth.noUserFound');

      req.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log(`error: ${error}`);
      return HttpResponse.create(res, 500, 'error');
    }
  }
  static async isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (!user) return HttpResponse.create(res, 401, 'auth.noUser');
    if (!user.isAdmin) return HttpResponse.create(res, 403, 'auth.noAdmin');
    next();
  }
  private static extractToken(req: Request): string {
    const source = envs.JWT_SOURCE_TYPE;

    switch (source) {
      case jwtSourceTypes.COOKIE:
        return req.cookies.jwt || '';

      case jwtSourceTypes.BEARER:
        const authorization = req.header('Authorization');
        if (!authorization) return '';
        if (!authorization.startsWith('Bearer ')) return '';
        return authorization.split(' ').at(1) || '';

      default:
        console.error(colors.red.inverse('Invalid jwt source type'));

        console.log(
          colors.red.inverse(
            `JWT_SOURCE_TYPE must be ${Object.values(jwtSourceTypes).join(
              ', '
            )}`
          )
        );
        console.log(colors.red.inverse('Please check your .env file'));
        process.exit(1);
    }
  }
}
