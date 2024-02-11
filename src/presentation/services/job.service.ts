import { Validators } from '../../config';
import { JobModel } from '../../data/mongo';
import { CustomError } from '../../domain';
import { CreateJobDto, PaginationDto, UpdateJobDto } from '../../domain/dtos';

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
  public async getJobById(id: string) {
    if (!Validators.isMongoId(id)) throw CustomError.badRequest('invalidId');
    const job = await JobModel.findById(id);
    if (!job) throw CustomError.notFound('job.notFound');
    return job;
  }
  async createJob(createJobDto: CreateJobDto) {
    try {
      const job = new JobModel({
        ...createJobDto,
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
