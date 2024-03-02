import { Router } from 'express';
import { UserController } from './controller';
import { UserService, MongoLogService } from '../services';
import { UpdateUserDto } from '../../domain/dtos';
import { ValidateDtoMiddleware } from '../middlewares/check-dto.middleware';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { USER_ROLES } from '../../domain/constants';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const logService = new MongoLogService();
    const userController = new UserController(userService, logService);

    router.get('/current-user', userController.getCurrentUser);
    router.get(
      '/admin/app-stats',
      AuthMiddleware.authorizeRoles([USER_ROLES.ADMIN_ROLE]),
      userController.getApplicationStats
    );

    router.patch(
      '/:id',
      ValidateDtoMiddleware(UpdateUserDto),
      userController.updateUser
    );

    return router;
  }
}
