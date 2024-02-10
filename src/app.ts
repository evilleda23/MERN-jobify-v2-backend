import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(async () => {
  await main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DBNAME,
  });
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
    public_path: '/public/uploads/',
  });

  server.start();
}
