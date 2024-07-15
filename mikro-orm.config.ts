import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { config } from 'dotenv';

config();

const mikroOrmConfig: Options = {
  host: process.env.POSTGRES_HOST,
  dbName: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  driver: PostgreSqlDriver,
  entities: ['dist/**/*.entity.js'],
  extensions: [Migrator],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default mikroOrmConfig;
