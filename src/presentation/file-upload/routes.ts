import { Router } from 'express';

import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';
import { MongoLogService } from '../services';

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const service = new FileUploadService();
    const logService = new MongoLogService();
    const controller = new FileUploadController(service, logService);
    // Definir las rutas
    router.use([
      FileUploadMiddleware.containFiles,
      TypeMiddleware.validTypes(['users', 'products', 'categories']),
    ]);
    //api/upload/single/<user|category|product>/
    router.post('/single/:type', controller.uploadFile);
    //api/upload/multiple/<user|category|product>/
    router.post('/multiple/:type', controller.uploadMutipleFiles);

    return router;
  }
}
