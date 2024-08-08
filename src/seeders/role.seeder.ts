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
      permissions: [
        { action: 'read', subject: 'all' },
        // Own permissions
        {
          action: 'update',
          subject: 'User',
          condition: { id: '${user.id}' },
        },
        // Post permissions
        {
          action: 'create',
          subject: 'Post',
        },
        {
          action: 'update',
          subject: 'Post',
          condition: { authorId: '${user.id}' },
        },
        {
          action: 'delete',
          subject: 'Post',
          condition: { authorId: '${user.id}' },
        },
        // Comment permissions
        {
          action: 'create',
          subject: 'Comment',
        },
        {
          action: 'update',
          subject: 'Comment',
          condition: { authorId: '${user.id}' },
        },
        {
          action: 'delete',
          subject: 'Comment',
          condition: { authorId: '${user.id}' },
        },
        // Comment permissions
        {
          action: 'create',
          subject: 'Comment',
        },
        {
          action: 'update',
          subject: 'Comment',
          condition: { authorId: '${user.id}' },
        },
        {
          action: 'delete',
          subject: 'Comment',
          condition: { authorId: '${user.id}' },
        },
        // Reaction permissions
        {
          action: 'create',
          subject: 'Reaction',
        },
        {
          action: 'delete',
          subject: 'Reaction',
          condition: { authorId: '${user.id}' },
        },
      ],
    });
  }
}
