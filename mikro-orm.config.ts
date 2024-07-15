import { config } from 'dotenv';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

config();

const mikroOrmConfig: Options = {
  host: process.env.POSTGRES_HOST,
  dbName: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  driver: PostgreSqlDriver,
  extensions: [Migrator, SeedManager],
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  seeder: {
    path: 'src/seeders/',
  },
};

export default mikroOrmConfig;
