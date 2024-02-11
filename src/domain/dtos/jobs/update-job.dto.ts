import { Validators } from '../../../config';
import { ErrorDto } from '../../interfaces';
import { validateJobStatus, validateJobType } from './job-validator';

export class UpdateJobDto {
  private constructor(
    public readonly id: string,
    public readonly company?: string,
    public readonly position?: string,
    public readonly jobLocation?: string,
    public readonly jobStatus?: string,
    public readonly jobType?: string
  ) {}
  get values() {
    const response: { [key: string]: any } = {};

    Object.keys(this).forEach((property) => {
      const value = (this as any)[property];
      if (value !== undefined && value !== null) {
        response[property] = value;
      }
    });

    return response;
  }
  static create(object: { [key: string]: any }): [ErrorDto[]?, UpdateJobDto?] {
    const { id, company, position, jobLocation, jobStatus, jobType } = object;
    const errors: ErrorDto[] = [];
    if (!id || !Validators.isMongoId(id))
      errors.push({ field: 'id', message: 'Id is required and must be valid' });
    if (Object.keys(object).length === 1)
      errors.push({
        field: 'update',
        message: 'At least one field is required to update',
      });
    if (jobStatus) {
      const [jobStatusError] = validateJobStatus(jobStatus);
      if (jobStatusError) errors.push(jobStatusError);
    }
    if (jobType) {
      const [jobTypeError] = validateJobType(jobType);
      if (jobTypeError) errors.push(jobTypeError);
    }

    if (errors.length > 0) return [errors];

    return [
      ,
      new UpdateJobDto(id, company, position, jobLocation, jobStatus, jobType),
    ];
  }
  static getName(): string {
    return this.name;
  }
}
