import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from './types';
import { axiosInstance } from '@/services';
import { useMutation } from 'react-query';
import { useUiContext } from '@/store';

const useCreateAccount = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const { showCheck, showCreate } = useUiContext();

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
    try {
      const response = await axiosInstance.post('/signup', incomingData);
      if (response.status === 200) {
        showCreate(false);
        showCheck(true);
      }
    } catch (error) {
      console.log(error);
      // TODO: show field errors to frontent under relevant inputs.
    }
  };

  const { mutate } = useMutation(signUp);

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
