import { Response } from 'express';
import { envs } from '../../config';

export class CookieHandler {
  static saveTokenInCookie(res: Response, token: string) {
    const secure = envs.NODE_ENV === 'production';
    const maxAge = envs.COOKIE_MAX_AGE;
    res.cookie('jwt', token, {
      httpOnly: true,
      secure,
      sameSite: 'strict',
      maxAge,
    });
  }

  static clearTokenInCookie(res: Response) {
    res.clearCookie('jwt');
  }
}
