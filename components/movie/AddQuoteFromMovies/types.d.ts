import { Genre } from '@/types';

export type PropsType = {
  userName: string;
  avatar?: string;
  userId: number;
  moviePoster?: string;
  movieName: string;
  movieYear: number;
  movieDirector: string;
  movieGenres: Genre[];
  movieId: string;
};
