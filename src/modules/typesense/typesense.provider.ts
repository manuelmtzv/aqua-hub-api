import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as Typesense from 'typesense';
import { TypesenseModuleOptions } from './interfaces/typesenseModuleOptions.interface';
import { schemas } from './schemas';
import { CollectionSchema } from 'typesense/lib/Typesense/Collection';

@Injectable()
export class TypesenseProvider implements OnModuleInit {
  public client: Typesense.Client;

  constructor(
    @Inject('TYPESENSE_MODULE_OPTIONS') private options: TypesenseModuleOptions,
  ) {
    this.client = new Typesense.Client({
      nodes: this.options.nodes,
      apiKey: this.options.apiKey,
    });
  }

  async onModuleInit() {
    try {
      const collections = await this.client.collections().retrieve();
      const collectionNames = collections.map((collection) => collection.name);
      const promises: Promise<CollectionSchema>[] = [];

      schemas.forEach((schema) => {
        if (!collectionNames.includes(schema.name)) {
          promises.push(this.client.collections().create(schema));
        }
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('Typesense connection failed', error);
    }
  }
}
