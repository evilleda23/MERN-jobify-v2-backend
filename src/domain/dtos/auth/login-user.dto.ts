import { regularExps } from '../../../config';

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['Missing Email'];
    if (!regularExps.email.test(email)) return ['Invalid Email'];
    if (!password) return ['Missing Password'];

    return [undefined, new LoginUserDto(email, password)];
  }
  static getName(): string {
    return this.name;
  }
}
