import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FormData } from './types';
import { useMutation } from 'react-query';
import { useUiContext } from '@/store';
import { signUp } from '@/services';

const useCreateAccount = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const { showCheck, showCreate } = useUiContext();
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    watch,
    formState,
    setError,
  } = methods;

  const password = watch('password');

  const applyInputStyle = (val: string): boolean => {
    const dirty = formState.dirtyFields[val as keyof FormData];
    const errorMessage = errors[val as keyof FormData]?.message;

    return (dirty && errorMessage) || errorMessage ? true : false;
  };

  const handleSignUp = async (incomingData: FormData) => {
    try {
      await signUp(incomingData);
      showCreate(false);
      showCheck(true);
    } catch (error: any) {
      if (error.response.data.errors.email) {
        setError('email', {
          type: 'manual',
          message: error.response.data.errors.email[0],
        });
      } else if (error.response.data.errors.name) {
        setError('name', {
          type: 'manual',
          message: error.response.data.errors.name[0],
        });
      }
    }
  };

  const { mutate } = useMutation(handleSignUp);

  const onSubmit = async (data: FormData) => {
    mutate(data);
  };

  const handleGoogle = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/redirect`);
  };

  return {
    handleSubmit,
    register,
    errors,
    trigger,
    onSubmit,
    reset,
    password,
    hidePassword,
    setHidePassword,
    hidePasswordConfirm,
    setHidePasswordConfirm,
    applyInputStyle,
    formState,
    methods,
    handleGoogle,
  };
};
export default useCreateAccount;
