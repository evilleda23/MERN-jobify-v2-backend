import { ErrorDto } from '../../interfaces';
import { createErrorDto } from '../shared';
import { validateJobStatus, validateJobType } from './job-validator';

export class CreateJobDto {
  private constructor(
    public readonly company: string,
    public readonly position: string,
    public readonly jobLocation: string,
    public readonly jobStatus: string,
    public readonly jobType: string
  ) {}

  static create(object: { [key: string]: any }): [ErrorDto[]?, CreateJobDto?] {
    const { company, position, jobLocation, jobStatus, jobType } = object;
    const errors: ErrorDto[] = [];
    if (!company) errors.push(createErrorDto('company', 'Company is required'));

    if (!position)
      errors.push(createErrorDto('position', 'Position is required'));
    if (!jobLocation) {
      errors.push(createErrorDto('jobLocation', 'Job Location is required'));
    }

    const [jobStatusError] = validateJobStatus(jobStatus);
    if (jobStatusError) errors.push(jobStatusError);
    const [jobTypeError] = validateJobType(jobType);
    if (jobTypeError) errors.push(jobTypeError);
    if (errors.length > 0) return [errors];
    return [
      ,
      new CreateJobDto(company, position, jobLocation, jobStatus, jobType),
    ];
  }
  static getName(): string {
    return this.name;
  }
}
