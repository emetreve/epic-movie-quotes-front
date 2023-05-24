import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from './types';
import { axiosInstance } from '@/services';
import { useMutation } from 'react-query';
import { useUiContext } from '@/store';

const useCreateAccount = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const { showCheck } = useUiContext();

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
  } = methods;

  const password = watch('password');

  const applyInputStyle = (val: string): boolean => {
    const dirty = formState.dirtyFields[val as keyof FormData];
    const errorMessage = errors[val as keyof FormData]?.message;

    return (dirty && errorMessage) || errorMessage ? true : false;
  };

  const signUp = async (incomingData: any) => {
    const response = await axiosInstance.post('/signup', incomingData);
    return response;
  };

  const { mutate } = useMutation(signUp, {
    onSuccess: () => {
      showCheck(true);
    },
  });

  const onSubmit = async (data: FormData) => {
    mutate(data);
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
  };
};
export default useCreateAccount;
