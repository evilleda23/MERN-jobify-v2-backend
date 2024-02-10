import { envs } from '../../config';
import { AuthService } from '../../presentation/services';
import { UserModel, MongoDatabase } from '../mongo';
import { seedData } from './data';

(async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DBNAME,
  });
  await seed();
  MongoDatabase.disconnect();
})();
const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

async function seed() {
  // Delete all data
  await Promise.all([UserModel.deleteMany({})]);
  // Create users
  const users = await UserModel.insertMany(seedData.users);
}
