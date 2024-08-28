import { Post } from '@/entities';

export const POST_CREATED_EVENT = 'post.created';

export class PostCreatedEvent {
  readonly post: Post;

  constructor(post: Post) {
    this.post = post;
  }
}
