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