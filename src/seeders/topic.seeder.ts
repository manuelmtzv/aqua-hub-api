import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Topic } from '@/entities';

export class TopicSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    topics.forEach((topic) => {
      em.create(Topic, topic);
    });
  }
}

const topics = [
  {
    translations: [
      {
        code: 'es',
        title: 'Alimentación',
        description:
          'Temas relacionados a la alimentación de los peces y animales acuáticos.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'Feeding',
        description: 'Topics related to feeding fish and aquatic animals.',
      },
    ],
  },
  {
    translations: [
      {
        code: 'es',
        title: 'Enfermedades',
        description:
          'Temas relacionados a las enfermedades de los peces y animales acuáticos.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'Diseases',
        description: 'Topics related to diseases in fish and aquatic animals.',
      },
    ],
  },
  {
    translations: [
      {
        code: 'es',
        title: 'Equipamiento',
        description:
          'Temas relacionados al equipamiento necesario para mantener un acuario.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'Equipment',
        description:
          'Topics related to the equipment needed to maintain an aquarium.',
      },
    ],
  },
  {
    translations: [
      {
        code: 'es',
        title: 'Plantas',
        description:
          'Temas relacionados a las plantas acuáticas y su mantenimiento.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'Plants',
        description: 'Topics related to aquatic plants and their maintenance.',
      },
    ],
  },
  {
    translations: [
      {
        code: 'es',
        title: 'Peces',
        description:
          'Temas relacionados a los peces y animales acuáticos en general.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'Fish',
        description: 'Topics related to fish and aquatic animals in general.',
      },
    ],
  },
  {
    translations: [
      {
        code: 'es',
        title: 'Reproducción',
        description:
          'Temas relacionados a la reproducción de los peces y animales acuáticos.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'Reproduction',
        description:
          'Topics related to the reproduction of fish and aquatic animals.',
      },
    ],
  },
  {
    translations: [
      {
        code: 'es',
        title: 'Sustrato',
        description:
          'Temas relacionados al sustrato y su importancia en un acuario.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'Substrate',
        description:
          'Topics related to substrate and its importance in an aquarium.',
      },
    ],
  },
  {
    translations: [
      {
        code: 'es',
        title: 'Tratamiento de agua',
        description:
          'Temas relacionados al tratamiento del agua para mantener un acuario.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'Water Treatment',
        description:
          'Topics related to water treatment to maintain an aquarium.',
      },
    ],
  },
  {
    translations: [
      {
        code: 'es',
        title: 'Consejos generales',
        description:
          'Consejos generales para mantener un acuario en buen estado.',
        enabled: true,
      },
      {
        code: 'en',
        title: 'General Advice',
        description:
          'General advice for keeping an aquarium in good condition.',
      },
    ],
  },
];
