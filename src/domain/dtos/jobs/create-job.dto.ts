import { ErrorDto } from '../../interfaces';
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
    if (!company)
      errors.push({
        field: 'company',
        message: 'Missing Company',
      });

    if (!position)
      errors.push({
        field: 'position',
        message: 'Missing Position',
      });
    if (!jobLocation) {
      errors.push({
        field: 'jobLocation',
        message: 'Missing Job Location',
      });
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
