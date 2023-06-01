export type Comment = {
  image: string;
  body: string;
  name: string;
  id: number;
};

export type PropsType = {
  avatar?: string;
  userName: string;
  quote: string;
  movie: string;
  year: string;
  quoteImage: string;
  likesQty: number;
  commentsQty: number;
  comments: Comment[];
};
