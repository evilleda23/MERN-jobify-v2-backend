import mongoose from 'mongoose';
import { USER_ROLES } from '../domain/constants';

export class Validators {
  static isMongoId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }
  static isValidEnumValue(value: string, enumValues: string[]): boolean {
    if (!value) return false;
    return enumValues.includes(value);
  }
  static isAdminRole(role: string): boolean {
    return role === USER_ROLES.ADMIN_ROLE;
  }
}
