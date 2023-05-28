import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { axiosInstance } from '@/services';
import { FormData } from './types';
import { useUiContext } from '@/store';

const LogIn = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const { showLog, showForgot } = useUiContext();
  const router = useRouter();

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
      await axiosInstance.post('/login', incomingData);
      router.push('/dashboard/newsfeed');
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
    hidePassword,
    setHidePassword,
    applyInputStyle,
    formState,
    methods,
    handleForgot,
    handleGoogle,
  };
};
export default LogIn;
