import { regularExps } from '../../../config';
import { ErrorDto } from '../../interfaces';

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [ErrorDto[]?, RegisterUserDto?] {
    const { name, email, password } = object;
    const errors: ErrorDto[] = [];
    if (!name)
      errors.push({
        field: 'name',
        message: 'Missing Name',
      });
    if (!email || !regularExps.email.test(email))
      errors.push({
        field: 'email',
        message: 'Email is required and must be a valid',
      });

    if (!password || !regularExps.password.test(password))
      errors.push({
        field: 'password',
        message:
          'Password is required and must include at least one uppercase letter, one lowercase letter, one digit, and at least one special character, with a minimum length of 8 characters',
      });
    if (errors.length > 0) return [errors];
    return [, new RegisterUserDto(name, email, password)];
  }
  static getName(): string {
    return this.name;
  }
}
