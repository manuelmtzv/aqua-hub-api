import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Forum } from '@/entities';

export class ForumSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    forums.forEach((forum) => {
      em.create(Forum, forum);
    });
  }
}

const forums = [
  {
    translations: [
      {
        code: 'es',
        title: 'Agua dulce',
        description:
          'Foro para discutir temas y compartir información acerca del cuidado y mantenimiento de acuarios de agua dulce.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'Freshwater',
        description:
          'Forum to discuss topics and share information about the care and maintenance of freshwater aquariums.',
      },
    ],
  },
  {
    translations: [
      {
        code: 'es',
        title: 'Agua salada',
        description:
          'Foro para discutir temas y compartir información acerca del cuidado y mantenimiento de acuarios de agua salada.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'Saltwater',
        description:
          'Forum to discuss topics and share information about the care and maintenance of saltwater aquariums.',
      },
    ],
  },
  {
    translations: [
      {
        code: 'es',
        title: 'General',
        description:
          'Foro para discutir temas, comentarios y consejos relacionados a la acuariofilia en general, tanto de agua salada como dulce.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'General',
        description:
          'Forum to discuss topics, comments, and advice related to aquaristics in general, including both saltwater and freshwater.',
      },
    ],
  },
];
