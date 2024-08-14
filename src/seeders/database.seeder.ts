import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {
  UserSeeder,
  TopicSeeder,
  ForumSeeder,
  LanguageSeeder,
  PostSeeder,
} from '.';

export class DatabaseSeeder extends Seeder {
  run(em: EntityManager): Promise<void> {
    return this.call(em, [
      UserSeeder,
      TopicSeeder,
      ForumSeeder,
      LanguageSeeder,
      PostSeeder,
    ]);
  }
}
