import { DynamicModule, Module } from '@nestjs/common';
import { TypesenseProvider } from './typesense.provider';
import { TypesenseModuleOptions } from './interfaces/typesenseModuleOptions.interface';
import { TypesenseController } from './typsesnese.controller';

@Module({
  controllers: [TypesenseController],
})
export class TypesenseModule {
  static forRoot(options: TypesenseModuleOptions): DynamicModule {
    return {
      module: TypesenseModule,
      providers: [
        {
          provide: 'TYPESENSE_MODULE_OPTIONS',
          useValue: options,
        },
        TypesenseProvider,
      ],
      exports: [TypesenseProvider],
      global: options.global,
    };
  }
}
