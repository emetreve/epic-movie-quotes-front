import { Comment, Like } from '@/types';

export type PropsType = {
  authUserId: number;
  authUserAvatar: string;
  quoteId: nunmber;
  userId: number;
  avatar?: string;
  userName: string;
  quote: string;
  movie: string;
  year: string;
  quoteImage: string;
  likesQuantity: number;
  commentsQty: number | null;
  comments: Comment[] | null;
  likes: Like[] | null;
  userAvatar: string;
};
