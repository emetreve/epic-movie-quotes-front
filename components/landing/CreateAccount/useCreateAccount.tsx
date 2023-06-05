import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { FormData } from './types';
import { useMutation } from 'react-query';
import { useUiContext } from '@/store';
import { signUp, googleInstance } from '@/services';

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
    formState,
    setError,
    control,
  } = methods;

  const password = useWatch({
    control,
    name: 'password',
  });

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

  const handleGoogle = async () => {
    try {
      const response = await googleInstance.get('');
      const url = response.data.url;
      router.push(url);
    } catch (error) {
      console.log(error);
    }
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
