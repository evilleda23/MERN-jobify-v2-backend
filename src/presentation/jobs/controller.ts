import { Request, Response } from 'express';

import { JobService } from '../services/job.service';

import { HttpResponse, handleError } from '../shared';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { CreateJobDto, PaginationDto, UpdateJobDto } from '../../domain/dtos';

export class JobController {
  constructor(
    public readonly jobService: JobService,
    private readonly logService: LogDatasource
  ) {}

  public getJobs = (req: Request, res: Response) => {
    const paginationDto = req.body.PaginationDto as PaginationDto;

    return this.jobService
      .getJobs(paginationDto!)
      .then((jobs) => HttpResponse.create(res, 200, `job.getAll`, jobs))
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.getJobs`,
          this.logService
        )
      );
  };
  public getJobById = (req: Request, res: Response) => {
    const { id } = req.params;

    return this.jobService
      .getJobById(id)
      .then((job) => HttpResponse.create(res, 200, 'job.getById', { job }))
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.getJobById`,
          this.logService
        )
      );
  };
  public createJob = (req: Request, res: Response) => {
    const createJobDto = req.body.CreateJobDto as CreateJobDto;

    return this.jobService
      .createJob(createJobDto!)
      .then((job) => HttpResponse.create(res, 201, 'job.create', { job }))
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.createJob`,
          this.logService
        )
      );
  };

  public updateJob = (req: Request, res: Response) => {
    const updateJobDto = req.body.UpdateJobDto as UpdateJobDto;

    return this.jobService
      .updateJob(updateJobDto)
      .then((job) => HttpResponse.create(res, 200, 'job.update', { job }))
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.updateJob`,
          this.logService
        )
      );
  };

  public deleteJob = (req: Request, res: Response) => {
    const { id } = req.params;

    return this.jobService
      .deleteJob(id)
      .then(() => HttpResponse.create(res, 200, 'job.delete', { id }))
      .catch((error) =>
        handleError(
          error,
          res,
          `${this.constructor.name}.deleteJob`,
          this.logService
        )
      );
  };
}
