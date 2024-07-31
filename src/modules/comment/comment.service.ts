import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Comment } from '~/src/entities';
import { CreateCommentDto, UpdateCommentDto } from './dtos';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    private readonly em: EntityManager,
  ) {}

  async getPostComments(postId: string) {
    return await this.commentRepository.find({ post: postId });
  }

  async getCommentReplies(commentId: string) {
    return await this.commentRepository.find({ replyTo: commentId });
  }

  async create(
    userId: string,
    target: 'post' | 'comment',
    targetId: string,
    createCommentDto: CreateCommentDto,
  ) {
    const entity =
      target === 'post' ? { post: targetId } : { replyTo: targetId };

    const comment = this.commentRepository.create({
      author: userId,
      ...createCommentDto,
      ...entity,
    });

    await this.em.persistAndFlush(comment);
  }

  async update(
    userId: string,
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment = await this.commentRepository.findOne({
      id: commentId,
    });

    if (comment.author.id !== userId) {
      throw new Error('Unauthorized');
    }

    comment.content = updateCommentDto.content;
    await this.em.persistAndFlush(comment);
  }
}
