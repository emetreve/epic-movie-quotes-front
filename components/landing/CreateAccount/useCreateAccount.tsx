import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { FormData } from './types';
import { useMutation } from 'react-query';
import { useUiContext } from '@/store';
import { signUp, googleInstance } from '@/services';
import { useTranslation } from 'next-i18next';

const useCreateAccount = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const { modalSwitchSetter } = useUiContext();
  const router = useRouter();
  const { t } = useTranslation('landing');

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
    formState,
    setError,
    control,
  } = methods;

  const password = useWatch({
    control,
    name: 'password',
  });

  const applyInputStyle = (val: string): boolean => {
    const dirty = formState.dirtyFields[val as keyof FormData];
    const errorMessage = errors[val as keyof FormData]?.message;

    return (dirty && errorMessage) || errorMessage ? true : false;
  };

  const handleSignUp = async (incomingData: FormData) => {
    try {
      if (router.locale === 'ka') {
        await signUp(incomingData, 'ka');
      } else {
        await signUp(incomingData);
      }
      modalSwitchSetter(false, 'showCreateAccount');
      modalSwitchSetter(true, 'showCheckEmail');
    } catch (error: any) {
      if (error.response.data.errors.name) {
        setError('name', {
          type: 'manual',
          message: error.response.data.errors.name[0][router.locale as string],
        });
      } else if (error.response.data.errors.email) {
        setError('email', {
          type: 'manual',
          message: error.response.data.errors.email[0][router.locale as string],
        });
      }
    }
  };

  const { mutate } = useMutation(handleSignUp);

  const onSubmit = async (data: FormData) => {
    mutate(data);
  };

  const handleGoogle = async () => {
    try {
      const response = await googleInstance.get('');
      const url = response.data.url;
      router.push(url);
    } catch (error) {}
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
    handleGoogle,
    t,
  };
};
export default useCreateAccount;
