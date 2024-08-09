import { MongoAbility, InferSubjects } from '@casl/ability';

export const actions = [
  'manage',
  'create',
  'read',
  'update',
  'delete',
] as const;

export type Action = (typeof actions)[number];

export type Subjects = InferSubjects<
  'Comment' | 'Post' | 'User' | 'Forum' | 'Media' | 'Reaction' | 'Topic' | 'all'
>;

export type AppAbility = MongoAbility<[Action, Subjects]>;
