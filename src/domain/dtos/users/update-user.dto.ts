import { Validators, regularExps } from '../../../config';
import { ErrorDto } from '../../interfaces';
import { createErrorDto } from '../shared/';

interface IUpdateUserDto {
  id: string;
  name?: string;
  lastname?: string;
  email?: string;
  location?: string;
}

export class UpdateUserDto {
  public readonly id;
  public readonly name;
  public readonly lastname;
  public readonly email;
  public readonly location;

  private constructor({ id, name, lastname, email, location }: IUpdateUserDto) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.location = location;
  }
  get values() {
    const response: { [key: string]: any } = {};

    Object.keys(this).forEach((property) => {
      const value = (this as any)[property];
      if (value !== undefined && value !== null) {
        response[property] = value;
      }
    });

    return response;
  }
  static create(object: { [key: string]: any }): [ErrorDto[]?, UpdateUserDto?] {
    const { id, name, email, lastname, location } = object;
    const errors: ErrorDto[] = [];
    if (!id || !Validators.isMongoId(id))
      errors.push(
        createErrorDto('id', 'Id is required and must be a valid id')
      );
    if (email && !regularExps.email.test(email))
      errors.push(
        createErrorDto('email', 'Email is required and must be a valid')
      );

    if (errors.length > 0) return [errors];
    return [, new UpdateUserDto({ id, name, lastname, email, location })];
  }
  static getName(): string {
    return this.name;
  }
}
