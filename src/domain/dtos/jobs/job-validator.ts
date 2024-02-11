import { Validators } from '../../../config';
import { ErrorDto } from '../../interfaces';
import { JOB_STATUS, JOB_TYPE } from '../../constants';

export const validateJobStatus = (status: string): [ErrorDto?, string?] => {
  if (!Validators.isValidJobStatus(status))
    return [
      {
        field: 'jobStatus',
        message: `Job Status is required, and must be one of the following options: ${Object.values(
          JOB_STATUS
        )}`,
      },
    ];

  return [, status];
};

export const validateJobType = (type: string): [ErrorDto?, string?] => {
  if (!Validators.isValidJobType(type))
    return [
      {
        field: 'jobType',
        message: `Job Type is required, and must be one of the following options: ${Object.values(
          JOB_TYPE
        )}`,
      },
    ];

  return [, type];
};
