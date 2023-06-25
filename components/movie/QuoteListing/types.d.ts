import { Like } from '@/types';

export type PropsType = {
  likesCount: number;
  commentsCount: number;
  body: {
    en: string;
    ka: string;
  };
  image?: string;
  likes: Like[];
  authUserId: number;
  quoteId: number;
  whichModalOpen: number | null;
  setWhichModalOpen: Function;
};
