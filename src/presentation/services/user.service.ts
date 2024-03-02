import { Response } from 'express';

import { CustomError } from '../../domain';
import { PaginationDto, UpdateUserDto } from '../../domain/dtos';
import { Paginate } from '../shared';
import { UserModel } from '../../data/mongo';

export class UserService {
  constructor() {}
  public async findById(id: string) {
    const user = await UserModel.findById(id);
    if (!user) throw CustomError.notFound('user.notFound');

    return user;
  }
  public async findByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.notFound('user.notFound');
    return user;
  }
  public async updateUser(updateUser: UpdateUserDto) {
    const { id, email } = updateUser.values;

    if (email) {
      const emailExists = await UserModel.findOne({ email });

      if (emailExists && id != emailExists?.id)
        throw CustomError.conflict('user.emailExists');
    }
    const user = await UserModel.findByIdAndUpdate(
      id,
      { ...updateUser.values },
      {
        new: true,
      }
    );
    if (!user) throw CustomError.notFound('user.notFound');
    return user;
  }
}
