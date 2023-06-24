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
  poster?: string;
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

export type Comment = {
  id: number;
  body: string;
  user: User;
  user_id: number;
  quote_id: number;
};

export type Like = {
  created_at: string;
  id: number;
  like: number;
  quote_id: number;
  user_id: number;
};

export type Quote = {
  id: number;
  body: {
    en: string;
    ka: string;
  };
  image?: string;
  user_id: number;
  movie_id: number;
  user: User;
  movie: Movie;
  comments: Comment[] | null;
  likes: Like[] | null;
};

export type Notification = {
  comment: Comment;
  comment_id: number;
  created_at: string;
  end_user_id: number;
  id: number;
  like_id: number | null;
  quote_id: number | null;
  read: number;
  updated_at: string;
  user: User;
  user_id: number;
};

export type NotificationMessage = {
  message: {
    id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    quote_id: number;
    like_id: number | null;
    comment_id: number | null;
    read: number;
    end_user_id: number;
    user: User;
    comment: Comment | null;
  };
};

export type QuoteMessage = {
  message: {
    id: number;
    body: {
      en: string;
      ka: string;
    };
    image?: string;
    user_id: number;
    movie_id: number;
    user: User;
    movie: Movie;
    comments: Comment[] | null;
    likes: Like[] | null;
  };
};

export type MovieForMoviesPage = {
  id: number;
  name: {
    en: string;
    ka: string;
  };
  poster?: string;
  year: string;
  user_id: number;
  quotes_count: number;
};

export type Genre = {
  id: number;
  name: {
    en: string;
    ka: string;
  };
};

export type QuoteFromMoviePage = {
  id: number;
  body: {
    en: string;
    ka: string;
  };
  image?: string;
  user_id: number;
  movie_id: number;
  user: User;
  movie: Movie;
  comments: Comment[] | null;
  likes: Like[];
  likes_count: number;
  comments_count: number;
};

export type MovieForSingleMoviePage = {
  id: number;
  name: {
    en: string;
    ka: string;
  };
  poster?: string;
  user_id: number;
  quotes_count?: number;
  description: {
    en: string;
    ka: string;
  };
  director: {
    en: string;
    ka: string;
  };
  genres?: Genre[];
  revenue: string;
  year: string;
};
