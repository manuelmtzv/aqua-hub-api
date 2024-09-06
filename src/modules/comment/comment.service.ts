import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment, CommentTarget } from '@/entities';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: EntityRepository<Comment>,
    private readonly em: EntityManager,
    private readonly i18n: I18nService,
  ) {}

  async findOneRaw(commentId: string) {
    return await this.commentRepository.findOne({ id: commentId });
  }

  async findOne(commentId: string) {
    const comment = await this.commentRepository.findOne(commentId);

    if (!comment) {
      throw new NotFoundException(
        this.i18n.t('errors.comment.notFound', {
          lang: I18nContext.current().lang,
        }),
      );
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
      throw new Error(
        this.i18n.t('errors.comment.unauthorized', {
          lang: I18nContext.current().lang,
        }),
      );
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
