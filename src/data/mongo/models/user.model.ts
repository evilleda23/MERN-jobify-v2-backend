import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, unique: true, required: [true, 'Email is required'] },
  emailValidated: { type: Boolean, default: false },
  password: { type: String, required: [true, 'Password is required'] },
  img: {
    type: String,
  },
  isAdmin: { type: Boolean, default: false },
  role: {
    type: [String],
    required: true,
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
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
