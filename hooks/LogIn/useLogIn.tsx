import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from './types';

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: {
      email: localStorage.getItem('email') || '',
      password: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (localStorage.getItem('email')) {
      trigger('email');
    }
    if (localStorage.getItem('password')) {
      trigger('password');
    }
  }, [trigger]);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return {
    handleSubmit,
    register,
    errors,
    trigger,
    onSubmit,
    reset,
  };
};
export default LogIn;
