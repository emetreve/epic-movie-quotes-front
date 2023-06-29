import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { axiosInstance, googleInstance } from '@/services';
import { FormData } from './types';
import { useUiContext } from '@/store';
import { useTranslation } from 'next-i18next';

const useLogIn = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const { showLog, showForgot } = useUiContext();
  const router = useRouter();
  const { t } = useTranslation('landing');

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
      showLog(false);
      router.push('/dashboard/newsfeed');
    } catch (error: any) {
      if (error.response.data.errors.user) {
        reset({ password: '' });
        setError('user', {
          type: 'manual',
          message: error.response.data.errors.user[0][router.locale as string],
        });
      }
    }
  };

  const { mutate } = useMutation(handleLogIn);

  const onSubmit = (data: FormData): void => {
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
    t,
  };
};
export default useLogIn;
