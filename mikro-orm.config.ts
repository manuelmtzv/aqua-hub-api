// import { defineConfig } from '@mikro-orm/core';
import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';

// const mikroOrmConfig: Options = {
//   entities: ['./dist/entities'],
//   entitiesTs: ['./src/entities'],
//   dbName: 'fishkeepers-hub-db',
//   password: 'password',
//   user: 'postgres',
//   driver: PostgreSqlDriver,
// };

// export const config = defineConfig(mikroOrmConfig);

const mikroOrmConfig: Options = {
  host: '127.0.0.1',
  dbName: 'fishkeepers-hub-db',
  password: 'password',
  user: 'postgres',
  driver: PostgreSqlDriver,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default mikroOrmConfig;
