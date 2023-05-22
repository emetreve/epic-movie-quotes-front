export type PropsType = {
  errors: FieldErrors<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }>;
  name: string;
  formState: FormState<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }>;
};
