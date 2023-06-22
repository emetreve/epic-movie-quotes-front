export type FormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export type ResetPasswordFormData = {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
};

export type ChangeUserData = {
  username?: string;
  password?: string;
  password_confirmation?: string;
};

export type AddCommentData = {
  body: string;
  user_id: number;
  quote_id: number;
};

export type SearchQuotesData = {
  search: string;
};

export type CreateQuoteFormData = {
  bodyEn: string;
  bodyGe: string;
  image: File | null;
};

export type CreateMovieFormData = {
  nameEn: string;
  nameGe: string;
  year: string;
  directorEn: string;
  directorGe: string;
  descriptionEn: string;
  descriptionGe: string;
  revenue: string;
  image: File | null;
};
