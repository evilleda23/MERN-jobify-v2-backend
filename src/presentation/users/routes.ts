import { Router } from 'express';
import { UserController } from './controller';
import { UserService, MongoLogService } from '../services';
import { UpdateUserDto } from '../../domain/dtos';
import { ValidateDtoMiddleware } from '../middlewares/check-dto.middleware';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const logService = new MongoLogService();
    const userController = new UserController(userService, logService);

    router.get('/current-user', userController.getCurrentUser);
    router.get('/admin/app-stats', userController.getApplicationStats);

    router.patch(
      '/:id',
      ValidateDtoMiddleware(UpdateUserDto),
      userController.updateUser
    );

    return router;
  }
}
