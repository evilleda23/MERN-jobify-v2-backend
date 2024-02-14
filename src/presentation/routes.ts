import { Router } from 'express';
import { constants } from '../domain/constants';

import { AuthRoutes } from './auth/routes';
import { FileUploadRoutes } from './file-upload/routes';
import { ImagesRoutes } from './images/routes';
import { JobRoutes } from './jobs/routes';
import { AuthMiddleware } from './middlewares/auth.middleware';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    const apiPrefix = constants.apiPrefix; //+ constants.apiVersion;

    // Definir las rutas
    router.use(`${apiPrefix}/auth`, AuthRoutes.routes);

    router.use(`${apiPrefix}/upload`, FileUploadRoutes.routes);
    router.use(`${apiPrefix}/images`, ImagesRoutes.routes);

    router.use(
      `${apiPrefix}/jobs`,
      AuthMiddleware.validateJWT,
      JobRoutes.routes
    );

    return router;
  }
}
