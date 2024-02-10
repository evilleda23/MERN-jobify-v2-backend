import { Response } from 'express';

import { CustomError } from '../../domain';
import { PaginationDto } from '../../domain/dtos';
import { Paginate } from '../shared';
import { UserModel } from '../../data/mongo';

export class UserService {
  constructor() {}
  public async findById(id: number) {
    try {
      const user = await UserModel.findById(id);
      if (!user) throw CustomError.notFound('User not found');

      return user;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
