import { Controller, Get } from '@nestjs/common';
import { TypesenseProvider } from './typesense.provider';

@Controller('typesense')
export class TypesenseController {
  constructor(private readonly typesense: TypesenseProvider) {}

  @Get()
  async findAll() {
    return this.typesense.client
      .collections('posts')
      .documents()
      .search({
        q: 'hello',
        query_by: ['title'],
      });
  }
}
