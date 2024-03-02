import { Request, Response } from 'express';

import { UserService } from '../services/user.service';

import { HttpResponse, handleError } from '../shared';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { UserEntity } from '../../domain';
import { UpdateUserDto } from '../../domain/dtos';

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

  public getApplicationStats = (req: Request, res: Response) => {
    return this.userService
      .getApplicationStats()
      .then((stats) =>
        HttpResponse.create(res, 200, 'user.getApplicationStats', { stats })
      )
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.getApplicationStats`,
          this.logService
        )
      );
  };

  public updateUser = (req: Request, res: Response) => {
    const updateUser = req.body.UpdateUserDto as UpdateUserDto;
    return this.userService
      .updateUser(updateUser)
      .then((user) =>
        HttpResponse.create(res, 200, 'user.updateUser', { user })
      )
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.updateUser`,
          this.logService
        )
      );
  };
}
