import colors from 'colors';
import { NextFunction, Request, Response } from 'express';

import { JWTAdapter, envs } from '../../config';
import { HttpResponse, handleError } from '../shared';
import { USER_ROLES, JWT_SOURCE_TYPES } from '../../domain/constants';
import { IPayload } from '../../domain/interfaces/payload.interface';
import { UserEntity } from '../../domain';
import { JobService, UserService } from '../services';

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const token = AuthMiddleware.extractToken(req);
    if (!token) return HttpResponse.create(res, 401, 'auth.invalidToken');
    try {
      const payload = await JWTAdapter.verify<IPayload>(token);

      if (!payload) return HttpResponse.create(res, 401, 'auth.invalidToken');
      const userService = new UserService();
      const userId = payload.id;
      if (!userId) return HttpResponse.create(res, 401, 'auth.invalidToken');
      const user = await userService.findById(userId);
      if (!user) return HttpResponse.create(res, 401, 'auth.noUserFound');

      req.user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      return handleError(error, res, 'AuthMiddleware.validateJWT');
    }
  }
  static async isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity;
    if (!user) return HttpResponse.create(res, 401, 'auth.noUser');
    if (!user.role || user.role !== USER_ROLES.ADMIN_ROLE)
      return HttpResponse.create(res, 403, 'auth.noAdmin');
    next();
  }

  static authorizeRoles(roles: USER_ROLES[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as UserEntity;
      if (!user) return HttpResponse.create(res, 401, 'auth.noUser');
      const role = user.role as USER_ROLES;
      if (!roles.includes(role)) return HttpResponse.create(res, 403, 'error');
      next();
    };
  }
  private static extractToken(req: Request): string {
    const source = envs.JWT_SOURCE_TYPE;

    switch (source) {
      case JWT_SOURCE_TYPES.COOKIE:
        return req.cookies.jwt || '';

      case JWT_SOURCE_TYPES.BEARER:
        const authorization = req.header('Authorization');
        if (!authorization) return '';
        if (!authorization.startsWith('Bearer ')) return '';
        return authorization.split(' ').at(1) || '';

      default:
        console.error(colors.red.inverse('Invalid jwt source type'));

        console.log(
          colors.red.inverse(
            `JWT_SOURCE_TYPE must be ${Object.values(JWT_SOURCE_TYPES).join(
              ', '
            )}`
          )
        );
        console.log(colors.red.inverse('Please check your .env file'));
        process.exit(1);
    }
  }
}
