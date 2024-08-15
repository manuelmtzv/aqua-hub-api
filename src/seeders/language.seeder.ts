import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { Language } from '@/entities';

export class LanguageSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Language, {
      code: 'es',
      name: 'Spanish',
    });

    em.create(Language, {
      code: 'en',
      name: 'English',
    });
  }
}
