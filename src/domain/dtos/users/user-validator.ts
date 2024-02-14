import { Validators } from '../../../config';
import { USER_ROLES } from '../../constants';
import { ErrorDto } from '../../interfaces';
import { createErrorDto } from '../shared';

export const validateUserRole = (role: string): [ErrorDto?, string?] => {
  const userRoles = Object.values(USER_ROLES);
  if (!Validators.isValidEnumValue(role, userRoles))
    return [
      createErrorDto(
        'role',
        `Role is required, and must be one of the following options: ${userRoles}`
      ),
    ];

  return [, role];
};
