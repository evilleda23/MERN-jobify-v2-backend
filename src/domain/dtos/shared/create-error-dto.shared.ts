import { ErrorDto } from '../../interfaces';

export const createErrorDto = (field: string, message: string): ErrorDto => {
  return {
    field,
    message,
  };
};
