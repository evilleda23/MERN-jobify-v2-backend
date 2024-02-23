import { Router } from 'express';
import { UserController } from './controller';
import { UserService, MongoLogService } from '../services';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const logService = new MongoLogService();
    const userController = new UserController(userService, logService);

    router.get('/current-user', userController.getCurrentUser);
    router.get('/admin/app-stats', userController.getApplicationStats);

    router.patch('/:id', userController.updateUser);

    return router;
  }
}
