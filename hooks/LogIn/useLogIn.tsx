import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { axiosInstance } from '@/services';
import { FormData } from './types';
import { useUiContext } from '@/store';

const LogIn = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const { showLog, showForgot } = useUiContext();

  const methods = useForm({
    defaultValues: {
      user: '',
      password: '',
      remember: false,
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
  } = methods;

  const applyInputStyle = (val: string): boolean => {
    const dirty = formState.dirtyFields[val as keyof FormData];
    const errorMessage = errors[val as keyof FormData]?.message;

    return (dirty && errorMessage) || errorMessage ? true : false;
  };

  const handleLogIn = async (incomingData: FormData) => {
    try {
      const response = await axiosInstance.post('/login', incomingData);
      console.log(response);
      console.log('REDIRECT TO NEWSFEED');
    } catch (error: any) {
      console.log(error);
    }
  };

  const { mutate } = useMutation(handleLogIn);

  const onSubmit = (data: FormData): void => {
    console.log(data);

    mutate(data);
  };

  const handleForgot = () => {
    showLog(false);
    showForgot(true);
  };

  return {
    handleSubmit,
    register,
    errors,
    trigger,
    onSubmit,
    reset,
    hidePassword,
    setHidePassword,
    applyInputStyle,
    formState,
    methods,
    handleForgot,
  };
};
export default LogIn;
