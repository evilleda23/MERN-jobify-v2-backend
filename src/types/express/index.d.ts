import { UserEntity } from '../../domain';
import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      user: UserEntity;
    }
  }
}
