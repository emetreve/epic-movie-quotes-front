import { FieldErrors, FormState } from 'react-hook-form';

export type FormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type FormErrors = FieldErrors<FormValues>;

export type CustomFormState = FormState<FormValues>;
