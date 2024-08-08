import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserSeeder, TopicSeeder, ForumSeeder, RoleSeeder } from '.';

export class DatabaseSeeder extends Seeder {
  run(em: EntityManager): Promise<void> {
    return this.call(em, [RoleSeeder, UserSeeder, TopicSeeder, ForumSeeder]);
  }
}
