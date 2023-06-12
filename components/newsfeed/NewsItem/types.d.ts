import { Comment } from '@/types';

export type PropsType = {
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
