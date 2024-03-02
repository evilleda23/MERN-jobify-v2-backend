import { Validators } from '../../config';
import { JobModel } from '../../data/mongo';
import { CustomError } from '../../domain';

import { CreateJobDto, PaginationDto, UpdateJobDto } from '../../domain/dtos';
import { UserEntity } from '../../domain/entities/user.entity';

import { Paginate } from '../shared';

export class JobService {
  constructor() {}
  public async getJobs(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, jobs] = await Promise.all([
        JobModel.countDocuments(),
        JobModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      if (!jobs) throw CustomError.notFound('Jobs not found');

      return Paginate.create(page, limit, total, jobs, 'jobs');
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  public async getJobsCreatedByUser(
    paginationDto: PaginationDto,
    user: UserEntity
  ) {
    const { page, limit } = paginationDto;

    try {
      const [total, jobs] = await Promise.all([
        JobModel.countDocuments({ createdBy: user.id }),
        JobModel.find({ createdBy: user.id })
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      if (!jobs) throw CustomError.notFound('Jobs not found');

      return Paginate.create(page, limit, total, jobs, 'jobs');
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async getJobById(id: string) {
    if (!Validators.isMongoId(id)) throw CustomError.badRequest('invalidId');
    const job = await JobModel.findById(id);
    if (!job) throw CustomError.notFound('job.notFound');
    return job;
  }

  public async getMyJobById(id: string, user: UserEntity) {
    const job = await this.getJobById(id);
    if (
      job.createdBy?.toString() !== user.id &&
      !Validators.isAdminRole(user.role)
    )
      throw CustomError.forbidden('error');
    return job;
  }

  async createJob(createJobDto: CreateJobDto, user: UserEntity) {
    try {
      const job = new JobModel({
        ...createJobDto,
        createdBy: user.id,
      });

      await job.save();
      return job;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateJob(updateJobDto: UpdateJobDto) {
    if (!Validators.isMongoId(updateJobDto.id))
      throw CustomError.badRequest('invalidId');

    const job = await JobModel.findByIdAndUpdate(
      updateJobDto.id,
      { ...updateJobDto.values },
      {
        new: true,
      }
    );

    if (!job) throw CustomError.notFound('job.notFound');
    return job;
  }

  async deleteJob(id: string) {
    if (!Validators.isMongoId(id)) throw CustomError.badRequest('invalidId');
    const job = await JobModel.findByIdAndDelete(id);
    if (!job) throw CustomError.notFound('job.notFound');
    return job;
  }
}
