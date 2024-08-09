import { ForcedSubject, MongoAbility } from '@casl/ability';

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

export type Abilities = [
  (typeof actions)[number],
  (
    | (typeof subjects)[number]
    | ForcedSubject<Exclude<(typeof subjects)[number], 'all'>>
  ),
];
export type AppAbility = MongoAbility<Abilities>;
