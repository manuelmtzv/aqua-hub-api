import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Topic } from '@/entities';

export class TopicSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Topic, {
      title: 'Alimentación',
      description:
        'Temas relacionados a la alimentación de los peces y animales acuáticos.',
    });

    em.create(Topic, {
      title: 'Enfermedades',
      description:
        'Temas relacionados a las enfermedades de los peces y animales acuáticos.',
    });

    em.create(Topic, {
      title: 'Equipamiento',
      description:
        'Temas relacionados al equipamiento necesario para mantener un acuario.',
    });

    em.create(Topic, {
      title: 'Plantas',
      description:
        'Temas relacionados a las plantas acuáticas y su mantenimiento.',
    });

    em.create(Topic, {
      title: 'Peces',
      description:
        'Temas relacionados a los peces y animales acuáticos en general.',
    });

    em.create(Topic, {
      title: 'Reproducción',
      description:
        'Temas relacionados a la reproducción de los peces y animales acuáticos.',
    });

    em.create(Topic, {
      title: 'Sustrato',
      description:
        'Temas relacionados al sustrato y su importancia en un acuario.',
    });

    em.create(Topic, {
      title: 'Tratamiento de agua',
      description:
        'Temas relacionados al tratamiento del agua para mantener un acuario.',
    });

    em.create(Topic, {
      title: 'Consejos generales',
      description: 'Consejos generales para mantener un acuario en buen estado',
    });
  }
}
