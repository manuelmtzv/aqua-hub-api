import { Request } from 'express';
import { User } from '~/src/entities';

export type RequestWithRefreshToken = {
  user: {
    user: User;
    tokenId: string;
    refreshToken: string;
  };
} & Request;
