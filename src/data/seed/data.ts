import { BcryptAdapter } from '../../config';
import { USER_ROLES } from '../../domain/constants';

export const seedData = {
  users: [
    {
      name: 'Admin User',
      email: 'admin@admin.com',
      password: BcryptAdapter.hash('admin'),
      role: USER_ROLES.ADMIN_ROLE,
      location: 'Lagos',
    },
    {
      name: 'John Doe',
      email: 'jdoe@gmail.com',
      password: BcryptAdapter.hash('123456'),

      location: 'Lagos',
    },
    {
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      password: BcryptAdapter.hash('123456'),

      location: 'Lagos',
    },
  ],
};
