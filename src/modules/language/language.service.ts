import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Language } from '@/entities';
import { EntityRepository } from '@mikro-orm/postgresql';
import { isUUID } from 'class-validator';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: EntityRepository<Language>,
  ) {}

  async findOneRaw(identifier: string): Promise<Language | null> {
    if (isUUID(identifier)) {
      return this.languageRepository.findOne({ id: identifier });
    }

    return this.languageRepository.findOne({ code: identifier });
  }
}
