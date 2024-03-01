import jwt from 'jsonwebtoken';
import { envs } from '../envs';
import { Response } from 'express';

const JWT_SECRET = envs.JWT_SECRET;
const JWT_EXPIRES = envs.JWT_EXPIRE || '3000h';
export class JWTAdapter {
  static async generateToken(
    payload: any,
    expiresIn?: string
  ): Promise<string | null> {
    return new Promise((resolve) => {
      return jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: expiresIn || JWT_EXPIRES },
        (err, token) => {
          if (err) return resolve(null);
          resolve(token!);
        }
      );
    });
  }

  static async verify<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
