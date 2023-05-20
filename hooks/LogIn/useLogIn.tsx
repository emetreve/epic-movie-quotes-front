import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from './types';

const LogIn = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      user: localStorage.getItem('user') || '',
      password: '',
      remember: localStorage.getItem('remember') === 'true' ?? false,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      trigger('user');
    }
    if (localStorage.getItem('password')) {
      trigger('password');
    }
  }, [trigger]);

  const onSubmit = (data: FormData): void => {
    console.log(data);
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
  };
};
export default LogIn;
