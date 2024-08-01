import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment, CommentTarget } from '~/src/entities';
import { CreateCommentDto, UpdateCommentDto } from './dtos';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    private readonly em: EntityManager,
  ) {}

  async findOneRaw(commentId: string) {
    return await this.commentRepository.findOne({ id: commentId });
  }

  async findOne(commentId: string) {
    const comment = await this.commentRepository.findOne(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async findPostComments(postId: string) {
    return await this.commentRepository.find({ post: postId });
  }

  async findCommentReplies(commentId: string) {
    return await this.commentRepository.find({ replyTo: commentId });
  }

  async create(
    userId: string,
    target: CommentTarget,
    targetId: string,
    createCommentDto: CreateCommentDto,
  ) {
    const entity = this.defineTarget(target, targetId);

    const comment = this.commentRepository.create({
      author: userId,
      target,
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

  private defineTarget(target: CommentTarget, targetId: string) {
    switch (target) {
      case 'Post':
        return { post: targetId };
      case 'Comment':
        return { replyTo: targetId };
    }
  }
}
