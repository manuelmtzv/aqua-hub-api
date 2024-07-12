import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        entities: ['./dist/entities'],
        entitiesTs: ['./src/entities'],
        dbName: 'fishkeepers-hub-db',
        password: 'password',
        user: 'postgres',
        driver: PostgreSqlDriver,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
