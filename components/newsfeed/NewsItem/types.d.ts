import { Comment } from '@/types';

export type PropsType = {
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
};
