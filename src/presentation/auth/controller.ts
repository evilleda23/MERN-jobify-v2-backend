import { Request, Response } from 'express';
import { RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../../domain/dtos';
import { HttpResponse, handleError } from '../shared';
import { LogDatasource } from '../../domain/datasources/log.datasource';

export class AuthController {
  constructor(
    public readonly authService: AuthService,
    private readonly logService: LogDatasource
  ) {}

  public validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;
    return this.authService
      .validateEmail(token)
      .then((emailValidated) =>
        HttpResponse.create(res, 200, 'auth.emailValidated', { emailValidated })
      )
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.validateEmail`,
          this.logService
        )
      );
  };

  public login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    return this.authService
      .loginUser(loginUserDto!)
      .then((user) => HttpResponse.create(res, 200, `auth.login`, user))
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.login`,
          this.logService
        )
      );
  };

  public register = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    return this.authService
      .registerUser(registerUserDto!)
      .then((user) => HttpResponse.create(res, 200, 'auth.register', user))
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.register`,
          this.logService
        )
      );
  };

  public logout = (req: Request, res: Response) => {
    return this.authService
      .logoutUser(res)
      .then((loggedOut) =>
        HttpResponse.create(res, 200, 'auth.logout', { loggedOut })
      )
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.logout`,
          this.logService
        )
      );
  };
}
