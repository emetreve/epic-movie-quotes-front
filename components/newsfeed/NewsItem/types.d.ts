import { Comment, Like } from '@/types';

export type PropsType = {
  authUserId: number;
  authUserAvatar: string;
  quote_id: nunmber;
  user_id: number;
  avatar?: string;
  userName: string;
  quote: string;
  movie: string;
  year: string;
  quoteImage: string;
  likesQty: number;
  commentsQty: number | null;
  comments: Comment[] | null;
  likes: Like[] | null;
};
