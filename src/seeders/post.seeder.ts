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

    em.create(Post, {
      title: 'The Ultimate Guide to Freshwater Aquariums',
      content: `Freshwater aquariums are a popular choice for hobbyists due to their ease of maintenance and the wide variety of fish species available. This guide will take you through everything you need to know about setting up and maintaining a freshwater tank, including selecting the right tank size, choosing suitable fish, and maintaining water quality. 
  From setting up the tank to introducing your first fish, this guide is designed to help you every step of the way. We’ll also cover common mistakes to avoid and tips for keeping your fish healthy and happy. Whether you’re a beginner or an experienced aquarist, this guide will provide valuable insights into the world of freshwater aquariums.`,
      author: user.id,
      forum: forums[0].id,
      topic: topics[0].id,
      topics: [topics[1].id],
      language: languages[0].id,
    });

    em.create(Post, {
      title: 'Advanced Techniques for Aquascaping',
      content: `Aquascaping is the art of designing and arranging aquatic landscapes within an aquarium. It goes beyond simply placing rocks and plants in a tank; it’s about creating a natural, aesthetically pleasing environment for your fish. 
  In this post, we’ll explore advanced aquascaping techniques, including the use of hardscape elements like rocks and driftwood, the selection of plants for different water conditions, and the importance of lighting. We’ll also discuss the different styles of aquascaping, such as the nature aquarium style, Dutch style, and iwagumi, and provide tips for achieving a balanced and harmonious design. 
  Aquascaping requires patience and creativity, but the results can be incredibly rewarding, transforming a simple tank into a living work of art.`,
      author: user.id,
      forum: forums[0].id,
      topic: topics[0].id,
      topics: [topics[1].id],
      language: languages[0].id,
    });

    em.create(Post, {
      title: 'Understanding Water Chemistry in Saltwater Tanks',
      content: `Maintaining the right water chemistry is crucial for the health and well-being of your saltwater aquarium inhabitants. This post will dive deep into the key aspects of water chemistry, including pH, salinity, alkalinity, and calcium levels. 
  We’ll discuss how each of these parameters affects the marine environment and the steps you can take to monitor and adjust them. You’ll also learn about the importance of regular water changes, the role of filtration systems, and how to deal with common water quality issues like nitrate buildup and phosphate spikes. 
  With the right knowledge and tools, you can create a stable and thriving environment for your saltwater fish, corals, and invertebrates.`,
      author: user.id,
      forum: forums[0].id,
      topic: topics[0].id,
      topics: [topics[1].id],
      language: languages[0].id,
    });

    em.create(Post, {
      title: 'Breeding Strategies for Discus Fish',
      content: `Discus fish are known for their vibrant colors and distinctive shape, making them a favorite among freshwater aquarium enthusiasts. However, breeding discus can be challenging due to their specific water and diet requirements. 
  In this post, we’ll cover the essential steps for successful discus breeding, from selecting breeding pairs to setting up a breeding tank. We’ll discuss the ideal water conditions, the importance of a varied diet, and how to care for the fry once they hatch. You’ll also learn about common breeding challenges, such as egg fungus and parental care issues, and how to overcome them. 
  Whether you’re a hobbyist looking to breed discus for the first time or an experienced breeder seeking to improve your success rate, this post will provide valuable tips and insights.`,
      author: user.id,
      forum: forums[0].id,
      topic: topics[0].id,
      topics: [topics[1].id],
      language: languages[0].id,
    });

    em.create(Post, {
      title: 'The Role of Plants in Aquariums: A Comprehensive Overview',
      content: `Aquatic plants play a vital role in maintaining the balance of an aquarium ecosystem. They not only add beauty to the tank but also provide oxygen, absorb toxins, and offer shelter for fish and invertebrates. 
  In this post, we’ll explore the different types of aquatic plants, their benefits, and how to choose the right plants for your aquarium. We’ll also discuss the importance of plant care, including the use of fertilizers, CO2 injection, and proper lighting. 
  Additionally, we’ll touch on the challenges of maintaining a planted tank, such as algae control and balancing plant growth with fish activity. By the end of this post, you’ll have a deeper understanding of how plants contribute to the overall health and aesthetics of your aquarium.`,
      author: user.id,
      forum: forums[0].id,
      topic: topics[0].id,
      topics: [topics[1].id],
      language: languages[0].id,
    });
  }
}
