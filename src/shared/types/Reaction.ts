const reactionType = {
  LIKE: 'Like',
  LAUGH: 'Laugh',
  LOVE: 'Love',
  CONFUSED: 'Confused',
  SUPPORT: 'Support',
  SAD: 'Sad',
  ANGRY: 'Angry',
  CELEBRATE: 'Celebrate',
} as const;

export type ReactionType = (typeof reactionType)[keyof typeof reactionType];
