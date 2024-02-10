import { BcryptAdapter } from '../../config';

export const seedData = {
  users: [
    {
      name: 'Admin User',
      email: 'admin@admin.com',
      password: BcryptAdapter.hash('admin'),
      isAdmin: true,
    },
    {
      name: 'John Doe',
      email: 'jdoe@gmail.com',
      password: BcryptAdapter.hash('123456'),
      isAdmin: false,
    },
    {
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      password: BcryptAdapter.hash('123456'),
      isAdmin: false,
    },
  ],
};
