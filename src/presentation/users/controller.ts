import { Request, Response } from 'express';

import { UserService } from '../services/user.service';

import { HttpResponse } from '../shared';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { UserEntity } from '../../domain';

export class UserController {
  constructor(
    public readonly userService: UserService,
    private readonly logService: LogDatasource
  ) {}

  public getCurrentUser = (req: Request, res: Response) => {
    const user = req.user as UserEntity;

    if (!user) return HttpResponse.create(res, 404, 'user.getCurrentUser');
    return HttpResponse.create(res, 200, 'user.getCurrentUser', { user });
  };

  public getApplicationStats = (req: Request, res: Response) => {};

  public updateUser = (req: Request, res: Response) => {};
}
