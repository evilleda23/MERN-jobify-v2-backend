import mongoose from 'mongoose';

import { JOB_STATUS, JOB_TYPE } from '../domain/constants';

export class Validators {
  static isMongoId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }
  static isValidJobStatus(status: string): boolean {
    if (!status) return false;
    const jobStatuses = Object.values(JOB_STATUS);
    return jobStatuses.includes(status as JOB_STATUS);
  }
  static isValidJobType(type: string): boolean {
    if (!type) return false;
    const jobTypes = Object.values(JOB_TYPE);
    return jobTypes.includes(type as JOB_TYPE);
  }
}
