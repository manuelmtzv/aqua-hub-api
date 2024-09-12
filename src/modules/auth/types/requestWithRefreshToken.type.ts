import { Request } from 'express';
import { User } from '@/entities';

export type RequestWithRefreshToken = {
  user: {
    user: User;
    tokenId: string;
    refreshToken: string;
  };
} & Request;
