import { Router } from 'express';
import { JobController } from './controller';
import { JobService, MongoLogService } from '../services';
import {
  ValidateQueryDtoMiddleware,
  ValidateBodyDtoMiddleware,
  ValidateDtoMiddleware,
} from '../middlewares/check-dto.middleware';
import { CreateJobDto, PaginationDto, UpdateJobDto } from '../../domain/dtos';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class JobRoutes {
  static get routes(): Router {
    const router = Router();

    const jobService = new JobService();
    const logService = new MongoLogService();
    const jobController = new JobController(jobService, logService);

    router.get(
      '/',
      ValidateQueryDtoMiddleware(PaginationDto),
      jobController.getJobs
    );
    router.get(
      '/my-jobs',
      ValidateQueryDtoMiddleware(PaginationDto),
      jobController.getJobsCreatedByUser
    );
    router.get('/:id', AuthMiddleware.isJobOwner, jobController.getJobById);
    router.post(
      '/',
      ValidateBodyDtoMiddleware(CreateJobDto),
      jobController.createJob
    );
    router.put(
      '/:id',
      ValidateDtoMiddleware(UpdateJobDto),
      jobController.updateJob
    );
    router.delete('/:id', jobController.deleteJob);

    return router;
  }
}
