import { MongoDatabase } from './';
import { envs } from '../../config/envs';
describe('mongo-init', () => {
  test('should create a new database', async () => {
    const connected = await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DBNAME,
    });
    expect(connected).toBe(true);
  });

  test('should disconnect from the database', async () => {
    const disconnected = await MongoDatabase.disconnect();
    expect(disconnected).toBe(true);
  });
});
