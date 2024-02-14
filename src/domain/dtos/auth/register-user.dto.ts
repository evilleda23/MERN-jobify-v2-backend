import { regularExps } from '../../../config';
import { ErrorDto } from '../../interfaces';
import { createErrorDto } from '../shared/';

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
    public location: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [ErrorDto[]?, RegisterUserDto?] {
    const { name, email, password, location } = object;
    const errors: ErrorDto[] = [];
    if (!name)
      errors.push(
        createErrorDto('name', 'Name is required and must be a string')
      );
    if (!email || !regularExps.email.test(email))
      errors.push(
        createErrorDto('email', 'Email is required and must be a valid')
      );

    if (!password || !regularExps.password.test(password))
      errors.push(
        createErrorDto(
          'password',
          'Password is required and must include at least one uppercase letter, one lowercase letter, one digit, and at least one special character, with a minimum length of 8 characters'
        )
      );
    if (!location) {
      errors.push(createErrorDto('location', 'Location is required'));
    }
    if (errors.length > 0) return [errors];
    return [, new RegisterUserDto(name, email, password, location)];
  }
  static getName(): string {
    return this.name;
  }
}
