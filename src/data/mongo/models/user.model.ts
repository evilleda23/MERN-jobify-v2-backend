import { Schema, model } from 'mongoose';
import { USER_ROLES } from '../../../domain/constants';

const userSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, unique: true, required: [true, 'Email is required'] },
  emailValidated: { type: Boolean, default: false },
  password: { type: String, required: [true, 'Password is required'] },
  img: {
    type: String,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  role: {
    type: String,
    required: true,
    default: USER_ROLES.USER_ROLE,
    enum: USER_ROLES,
  },
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});
export const UserModel = model('User', userSchema);
