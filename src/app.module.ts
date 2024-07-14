import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';

import mikroOrmConfig from '~/mikro-orm.config';
import { AuthModule, HealthModule } from '@/modules';
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: () => ({
        ...mikroOrmConfig,
        autoLoadEntities: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
