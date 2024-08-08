import { Ability } from '@casl/ability';

export const actions = [
  'manage',
  'create',
  'read',
  'update',
  'delete',
] as const;

export type Action = (typeof actions)[number];

export const subjects = [
  'User',
  'Role',
  'Permission',
  'Post',
  'Comment',
  'Forum',
  'Media',
  'Reaction',
  'Topic',
  'all',
] as const;

export type Subject = (typeof subjects)[number];

export type AppAbility = Ability<[Action, Subject]>;
