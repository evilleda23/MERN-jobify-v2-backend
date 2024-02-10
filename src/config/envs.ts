import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  NODE_ENV: get('NODE_ENV').required().asString(),
  WEBSERVER_URL: get('WEBSERVER_URL').required().asString(),
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DBNAME: get('MONGO_DBNAME').required().asString(),
  JWT_SECRET: get('JWT_SECRET').required().asString(),
  JWT_EXPIRE: get('JWT_EXPIRE').required().asString(),
  JWT_SOURCE_TYPE: get('JWT_SOURCE_TYPE').required().asString(),
  COOKIE_MAX_AGE: get('COOKIE_MAX_AGE').required().asIntPositive(),
  SEND_EMAIL: get('SEND_EMAIL').default('false').asBool(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
};
