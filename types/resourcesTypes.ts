export type User = {
  avatar?: string;
  created_at: string;
  email: string;
  email_verified_at: string;
  id: number;
  is_google_user?: number;
  name: string;
  updated_at: string;
};

export type Movie = {
  id: number;
  name: {
    en: string;
    ka: string;
  };
  poster: string;
  year: string;
  description: {
    en: string;
    ka: string;
  };
  director: {
    en: string;
    ka: string;
  };
  revenue: string;
  user_id: number;
  user: User;
};

export type Quote = {
  id: number;
  body: {
    en: string;
    ka: string;
  };
  image: string;
  user_id: number;
  movie_id: number;
  user: User;
  movie: Movie;
};
