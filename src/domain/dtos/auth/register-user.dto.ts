import { regularExps } from '../../../config';

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ['Missing Name'];
    if (!email) return ['Missing Email'];
    if (!regularExps.email.test(email)) return ['Invalid Email'];
    if (!password) return ['Missing Password'];
    if (!regularExps.password.test(password)) return ['Invalid Password'];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
  static getName(): string {
    return this.name;
  }
}
