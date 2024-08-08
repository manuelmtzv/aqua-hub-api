import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '@/entities';

export class RoleSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Role, {
      name: 'owner',
      permissions: [{ action: 'manage', subject: 'all' }],
    });

    em.create(Role, {
      name: 'user',
      permissions: [{ action: 'read', subject: 'all' }],
    });
  }
}
