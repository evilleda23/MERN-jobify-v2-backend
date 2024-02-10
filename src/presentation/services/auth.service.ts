import { Response } from 'express';
import { JWTAdapter, BcryptAdapter, envs } from '../../config';

import { CustomError, UserEntity } from '../../domain';
import { LoginUserDto } from '../../domain/dtos';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { EmailService } from './email.service';
import { UserModel } from '../../data/mongo';

export class AuthService {
  constructor(private readonly emailService: EmailService) {}
  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({
      email: registerUserDto.email,
    });
    if (existUser) throw CustomError.badRequest('auth.emailExists');
    try {
      const user = await UserModel.create({
        ...registerUserDto,
        password: BcryptAdapter.hash(registerUserDto.password),
      });
      user.save();
      await this.sendEmailValidationLink(user.email);
      const { password, ...userEntity } = UserEntity.fromObject(user);
      const token = await JWTAdapter.generateToken(
        {
          id: userEntity.id,
          email: userEntity.email,
        },
        envs.JWT_EXPIRE
      );
      if (!token) throw CustomError.internalServer('auth.generateToken');
      return { user: userEntity, token };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await UserModel.findOne({ email: loginUserDto.email });
    if (!existUser) throw CustomError.unauthorize('auth.login');
    const isPasswordValid = BcryptAdapter.compare(
      loginUserDto.password,
      existUser.password
    );
    if (!isPasswordValid) throw CustomError.unauthorize('auth.login');

    const { password, ...userEntity } = UserEntity.fromObject(existUser);

    const token = await JWTAdapter.generateToken({
      id: userEntity.id,
      email: userEntity.email,
    });

    if (!token) throw CustomError.internalServer('auth.token');

    return { user: userEntity, token };
  }

  public async validateEmail(token: string) {
    const decodedToken = await JWTAdapter.verify(token);
    if (!decodedToken) throw CustomError.unauthorize('auth.invalidToken');
    const { email } = decodedToken as { email: string };
    if (!email) throw CustomError.internalServer('auth.decodingToken');
    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.notFound('auth.noUserFound');

    await UserModel.updateOne({
      where: { id: user.id },
      data: { emailValidated: true },
    });
    //TODO: retornar un html con un mensaje de que el email fue validado
    return true;
  }

  private async sendEmailValidationLink(email: string) {
    const token = await JWTAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer('auth.token');
    const link = `${envs.WEBSERVER_URL}/auth/validate-email/${token}`;
    const htmlBody = `<h1>Click <a href="${link}">here</a> to validate your email: ${email}</h1>`;

    const emailOptions = {
      to: email,
      subject: 'Validate your email',
      htmlBody,
    };
    const isEmailSent = await this.emailService.sendEmail(emailOptions);
    if (!isEmailSent) throw CustomError.internalServer('email.send');
    return true;
  }

  public async logoutUser(res: Response) {
    JWTAdapter.clearTokenInCookie(res);
    return true;
  }
}
