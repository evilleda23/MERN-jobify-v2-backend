import { Validators } from '../../../config';
import { ErrorDto } from '../../interfaces';
import { JOB_STATUS, JOB_TYPE } from '../../constants';
import { createErrorDto } from '../shared';

export const validateJobStatus = (status: string): [ErrorDto?, string?] => {
  if (!Validators.isValidEnumValue(status, Object.values(JOB_STATUS)))
    return [
      createErrorDto(
        'jobStatus',
        `Job Status is required, and must be one of the following options: ${Object.values(
          JOB_STATUS
        )}`
      ),
    ];

  return [, status];
};

export const validateJobType = (type: string): [ErrorDto?, string?] => {
  if (!Validators.isValidEnumValue(type, Object.values(JOB_TYPE)))
    return [
      createErrorDto(
        'jobType',
        `Job Type is required, and must be one of the following options: ${Object.values(
          JOB_TYPE
        )}`
      ),
    ];

  return [, type];
};
