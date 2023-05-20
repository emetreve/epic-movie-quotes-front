import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from './types';

const useCreateAccount = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: localStorage.getItem('name') || '',
      email: localStorage.getItem('email') || '',
      password: '',
      password_confirmation: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (localStorage.getItem('name')) {
      trigger('name');
    }
    if (localStorage.getItem('email')) {
      trigger('email');
    }
  }, [trigger]);

  const password = watch('password');

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
    password,
    hidePassword,
    setHidePassword,
    hidePasswordConfirm,
    setHidePasswordConfirm,
  };
};
export default useCreateAccount;
