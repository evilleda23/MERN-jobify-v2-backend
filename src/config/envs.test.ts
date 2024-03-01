import { envs } from './envs';
describe('Test envs', () => {
  test('should return the correct envs', () => {
    expect(envs).toEqual({
      PORT: 3001,
      NODE_ENV: 'test',
      WEBSERVER_URL: 'http://localhost:3001/api',
      MONGO_URL: 'mongodb://mongo-user:123456@localhost:27017',
      MONGO_DBNAME: 'jobify-test',
      JWT_SECRET: 'SECRETKEY',
      JWT_EXPIRE: '60d',
      JWT_SOURCE_TYPE: 'COOKIE',
      COOKIE_MAX_AGE: 2592000000,
      SEND_EMAIL: true,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'pruebasestu@gmail.com',
      MAILER_SECRET_KEY: 'kzmrbttkrklgpmts',
    });
  });

  test('should return error if not found env', async () => {
    jest.resetModules();
    process.env.PORT = 'ABC';
    try {
      await import('./envs');
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
