import { Movie } from '@/types';

export type PropsType = {
  userName: string;
  avatar?: string;
  userId: number;
  movie: Movie;
  refetchMovie: Function;
};
