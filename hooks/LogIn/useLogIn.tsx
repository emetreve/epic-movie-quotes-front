import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { axiosInstance, googleInstance } from '@/services';
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
    setError,
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
      if (error.response.data.message) {
        setError('user', {
          type: 'manual',
          message: error.response.data.message,
        });
      }
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
