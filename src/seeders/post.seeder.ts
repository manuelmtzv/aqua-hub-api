import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { Forum, Language, Post, Topic, User } from '@/entities';

export class PostSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = await em.findOneOrFail(User, { username: 'manuel.mtzv' });
    const forums = await em.find(Forum, {});
    const topics = await em.find(Topic, {});
    const languages = await em.find(Language, {});

    em.create(Post, {
      title: 'Hello World',
      content: 'This is the first post',
      author: user.id,
      forum: forums[0].id,
      topic: topics[0].id,
      topics: [topics[1].id],
      language: languages[0].id,
    });
  }
}
