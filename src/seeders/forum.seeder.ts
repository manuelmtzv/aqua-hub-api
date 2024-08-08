import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Forum } from '@/entities';

export class ForumSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Forum, {
      title: 'Agua dulce',
      description:
        'Foro para discutir temas y compartir información acerca del cuidado y mantenimiendo de acuarios de agua dulce.',
    });

    em.create(Forum, {
      title: 'Agua salada',
      description:
        'Foro para discutir temas y compartir información acerca del cuidado y mantenimiendo de acuarios de agua salada.',
    });

    em.create(Forum, {
      title: 'General',
      description:
        'Foro para discutir temas, comentarios y consejos relacionados a la acuariofilia en general, tanto de agua salada como dulce.',
    });
  }
}
