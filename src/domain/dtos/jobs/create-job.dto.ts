import { ErrorDto } from '../../interfaces';
import { createErrorDto } from '../shared';
import { validateJobStatus, validateJobType } from './job-validator';

interface ICreateJobDto {
  company: string;
  position: string;
  jobLocation: string;
  jobStatus: string;
  jobType: string;
}
export class CreateJobDto {
  public readonly company: string;
  public readonly position: string;
  public readonly jobLocation: string;
  public readonly jobStatus: string;
  public readonly jobType: string;

  private constructor(createJobProps: ICreateJobDto) {
    this.company = createJobProps.company;
    this.position = createJobProps.position;
    this.jobLocation = createJobProps.jobLocation;
    this.jobStatus = createJobProps.jobStatus;
    this.jobType = createJobProps.jobType;
  }

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
      new CreateJobDto({
        company,
        position,
        jobLocation,
        jobStatus,
        jobType,
      }),
    ];
  }
  static getName(): string {
    return this.name;
  }
}
