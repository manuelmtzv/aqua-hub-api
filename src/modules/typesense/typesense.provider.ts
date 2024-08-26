import { Inject, Injectable } from '@nestjs/common';
import * as Typesense from 'typesense';
import { TypesenseModuleOptions } from './interfaces/typesenseModuleOptions.interface';

@Injectable()
export class TypesenseProvider {
  public client: Typesense.Client;

  constructor(
    @Inject('TYPESENSE_MODULE_OPTIONS') private options: TypesenseModuleOptions,
  ) {
    this.client = new Typesense.Client({
      nodes: this.options.nodes,
      apiKey: this.options.apiKey,
    });
  }
}
