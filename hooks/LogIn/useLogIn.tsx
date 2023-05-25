import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

  const onSubmit = (data: FormData): void => {
    console.log(data);
  };

  const handleForgot = () => {
    console.log('clicked');
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
