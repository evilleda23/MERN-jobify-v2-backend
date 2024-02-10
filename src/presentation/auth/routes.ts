import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService, EmailService, MongoLogService } from '../services';
import { envs } from '../../config';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
      envs.SEND_EMAIL
    );
    const authService = new AuthService(emailService);
    const logService = new MongoLogService();
    const authController = new AuthController(authService, logService);
    router.get('/validate-email/:token', authController.validateEmail);

    router.post('/login', authController.login);
    router.post('/register', authController.register);
    router.put('/logout', authController.logout);

    return router;
  }
}
