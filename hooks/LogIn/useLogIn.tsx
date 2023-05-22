import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from './types';

const LogIn = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const methods = useForm({
    defaultValues: {
      user: localStorage.getItem('user') || '',
      password: '',
      remember: localStorage.getItem('remember') === 'true' ?? false,
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

  useEffect(() => {
    if (localStorage.getItem('user')) {
      trigger('user');
    }
    if (localStorage.getItem('password')) {
      trigger('password');
    }
  }, [trigger]);

  const applyInputStyle = (val: string): boolean => {
    const dirty = formState.dirtyFields[val as keyof FormData];

    if (errors[val as keyof FormData]?.message) {
      if (
        dirty ||
        (localStorage.getItem(val) && localStorage.getItem(val) !== '')
      ) {
        return true;
      }
    }
    if (errors[val as keyof FormData]?.message) return true;
    return false;
  };

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
    applyInputStyle,
    formState,
    methods,
  };
};
export default LogIn;
