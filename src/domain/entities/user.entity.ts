import { Validators } from '../../config';
import { USER_ROLES } from '../constants';
import { CustomError } from '../errors/custom.error';

interface IUserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  location: string;
  emailValidated: boolean;
  role: string;
  img?: string;
}

export class UserEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly location: string;
  public readonly emailValidated: boolean;
  public readonly role: string;
  public readonly img?: string;

  constructor(userProps: IUserEntity) {
    this.id = userProps.id;
    this.name = userProps.name;
    this.email = userProps.email;
    this.password = userProps.password;
    this.location = userProps.location;
    this.emailValidated = userProps.emailValidated;
    this.role = userProps.role;
    this.img = userProps.img;
  }

  static fromObject(object: { [key: string]: any }): UserEntity {
    const {
      id,
      _id,
      name,
      email,
      password,
      emailValidated,
      img,
      role,
      location,
    } = object;
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

    if (!Validators.isValidEnumValue(role, Object.values(USER_ROLES))) {
      throw CustomError.badRequest('Invalid Role');
    }
    if (!location) {
      throw CustomError.badRequest('Missing Location');
    }
    return new UserEntity({
      id: _id || id,
      name,
      email,
      password,
      location,
      emailValidated,
      role,
      img,
    });
  }
}
