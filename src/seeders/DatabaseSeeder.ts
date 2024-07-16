import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '@/entities';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = em.create(User, {
      email: 'manuel.mtzv816@gmail.com',
      username: 'manuel.mtzv',
      hashedPassword: 'Password123$',
      birthdate: '2024-07-16',
      name: 'Manuel',
      lastname: 'Martinez',
    });

    console.log(user);
  }
}
