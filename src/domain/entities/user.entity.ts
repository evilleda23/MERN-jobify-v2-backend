import { CustomError } from '../errors/custom.error';

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public emailValidated: boolean,
    public isAdmin: boolean,
    public img?: string
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, password, emailValidated, img, isAdmin } =
      object;
    if (!id && !_id) {
      throw CustomError.badRequest('Missing ID');
    }
    if (!name) {
      throw CustomError.badRequest('Missing Name');
    }
    if (!email) {
      throw CustomError.badRequest('Missing Email');
    }
    if (emailValidated === undefined) {
      throw CustomError.badRequest('Missing EmailValidated');
    }
    if (!password) {
      throw CustomError.badRequest('Missing Password');
    }

    return new UserEntity(
      _id || id,
      name,
      email,
      password,
      emailValidated,
      isAdmin,
      img
    );
  }
}
