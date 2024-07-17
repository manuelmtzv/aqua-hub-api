import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '@/entities';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      email: 'manuel.mtzv816@gmail.com',
      username: 'manuel.mtzv',
      hashedPassword: 'Password123$',
      birthdate: '2024-07-16',
      name: 'Manuel',
      lastname: 'Martinez',
    });
  }
}
