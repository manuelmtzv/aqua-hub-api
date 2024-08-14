import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Topic } from '@/entities';

export class TopicSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Topic, {
      translations: [
        {
          title: 'Alimentación',
          description:
            'Temas relacionados a la alimentación de los peces y animales acuáticos.',
          enabled: true,
        },
      ],
    });

    em.create(Topic, {
      translations: [
        {
          title: 'Enfermedades',
          description:
            'Temas relacionados a las enfermedades de los peces y animales acuáticos.',
          enabled: true,
        },
      ],
    });

    em.create(Topic, {
      translations: [
        {
          title: 'Equipamiento',
          description:
            'Temas relacionados al equipamiento necesario para mantener un acuario.',
          enabled: true,
        },
      ],
    });

    em.create(Topic, {
      translations: [
        {
          title: 'Plantas',
          description:
            'Temas relacionados a las plantas acuáticas y su mantenimiento.',
          enabled: true,
        },
      ],
    });

    em.create(Topic, {
      translations: [
        {
          title: 'Peces',
          description:
            'Temas relacionados a los peces y animales acuáticos en general.',
          enabled: true,
        },
      ],
    });

    em.create(Topic, {
      translations: [
        {
          title: 'Reproducción',
          description:
            'Temas relacionados a la reproducción de los peces y animales acuáticos.',
          enabled: true,
        },
      ],
    });

    em.create(Topic, {
      translations: [
        {
          title: 'Sustrato',
          description:
            'Temas relacionados al sustrato y su importancia en un acuario.',
          enabled: true,
        },
      ],
    });

    em.create(Topic, {
      translations: [
        {
          title: 'Tratamiento de agua',
          description:
            'Temas relacionados al tratamiento del agua para mantener un acuario.',
          enabled: true,
        },
      ],
    });

    em.create(Topic, {
      translations: [
        {
          title: 'Consejos generales',
          description:
            'Consejos generales para mantener un acuario en buen estado',
          enabled: true,
        },
      ],
    });
  }
}
