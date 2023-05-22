import { FormErrors, CustomFormState } from '@/types/formTypes';

export type PropsType = {
  errors: FormErrors;
  name: string;
  formState: CustomFormState;
  password_related?: boolean;
};
