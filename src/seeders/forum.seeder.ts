import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Forum } from '@/entities';

export class ForumSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Forum, {
      translations: [
        {
          code: 'es',
          title: 'Agua dulce',
          description:
            'Foro para discutir temas y compartir información acerca del cuidado y mantenimiendo de acuarios de agua dulce.',
          enabled: true,
        },
      ],
    });

    em.create(Forum, {
      translations: [
        {
          code: 'es',
          title: 'Agua salada',
          description:
            'Foro para discutir temas y compartir información acerca del cuidado y mantenimiendo de acuarios de agua salada.',
          enabled: true,
        },
      ],
    });

    em.create(Forum, {
      translations: [
        {
          code: 'es',
          title: 'General',
          description:
            'Foro para discutir temas, comentarios y consejos relacionados a la acuariofilia en general, tanto de agua salada como dulce.',
          enabled: true,
        },
      ],
    });
  }
}
