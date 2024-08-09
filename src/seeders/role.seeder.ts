import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '@/entities';
import { AppAbility } from '../shared/types/appAbility.type';
import { RawRuleOf } from '@casl/ability';

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

export const userDefaultAbilities: RawRuleOf<AppAbility>[] = [
  { action: 'read', subject: 'all' },
  {
    action: 'update',
    subject: 'User',
    conditions: { id: '${user.id}' },
  },
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
