import { Schema, model } from 'mongoose';
import { JOB_STATUS, JOB_TYPE } from '../../../domain/constants';

const JobSchema = new Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: JOB_STATUS,
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: JOB_TYPE,
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
  },
  { timestamps: true }
);
JobSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});
export const JobModel = model('Job', JobSchema);
