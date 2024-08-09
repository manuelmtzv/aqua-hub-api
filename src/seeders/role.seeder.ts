import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Permission, Role } from '@/entities';

export class RoleSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Role, {
      name: 'owner',
      permissions: [{ action: 'manage', subject: 'all' }],
    });

    em.create(Role, {
      name: 'user',
      permissions: userDefaultAbilities,
    });
  }
}

export const userDefaultAbilities: Permission[] = [
  { action: 'read', subject: 'all' },
  // Own permissions
  {
    action: 'update',
    subject: 'User',
    conditions: { id: '${user.id}' },
  },
  // Post permissions
  {
    action: 'create',
    subject: 'Post',
  },
  {
    action: 'update',
    subject: 'Post',
    conditions: { authorId: '${user.id}' },
  },
  {
    action: 'delete',
    subject: 'Post',
    conditions: { authorId: '${user.id}' },
  },
  // Comment permissions
  {
    action: 'create',
    subject: 'Comment',
  },
  {
    action: 'update',
    subject: 'Comment',
    conditions: { authorId: '${user.id}' },
  },
  {
    action: 'delete',
    subject: 'Comment',
    conditions: { authorId: '${user.id}' },
  },
  // Comment permissions
  {
    action: 'create',
    subject: 'Comment',
  },
  {
    action: 'update',
    subject: 'Comment',
    conditions: { authorId: '${user.id}' },
  },
  {
    action: 'delete',
    subject: 'Comment',
    conditions: { authorId: '${user.id}' },
  },
  // Reaction permissions
  {
    action: 'create',
    subject: 'Reaction',
  },
  {
    action: 'delete',
    subject: 'Reaction',
    conditions: { authorId: '${user.id}' },
  },
];
