import mongoose from 'mongoose';

export class Validators {
  static isMongoId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  static isValidEnumValue(value: string, enumValues: string[]): boolean {
    if (!value) return false;
    return enumValues.includes(value);
  }
}
