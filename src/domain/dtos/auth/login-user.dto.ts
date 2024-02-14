import { regularExps } from '../../../config';
import { ErrorDto } from '../../interfaces';
import { createErrorDto } from '../shared';

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [ErrorDto[]?, LoginUserDto?] {
    const { email, password } = object;
    const errors: ErrorDto[] = [];
    if (!email || !regularExps.email.test(email))
      errors.push(
        createErrorDto('email', 'Email is required and must be a valid')
      );

    if (!password)
      errors.push(createErrorDto('password', 'Password is required'));
    if (errors.length > 0) return [errors];
    return [, new LoginUserDto(email, password)];
  }
  static getName(): string {
    return this.name;
  }
}
