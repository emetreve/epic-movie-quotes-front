import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { FormData } from './types';
import { useMutation } from 'react-query';
import { useUiContext } from '@/store';
import { resetPassword } from '@/services';
import { useTranslation } from 'next-i18next';

const useCreateNewPassword = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const { modalSwitchSetter } = useUiContext();
  const router = useRouter();
  const { t } = useTranslation('landing');

  const methods = useForm({
    defaultValues: {
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
    control,
    formState,
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

  const handleResetPassword = async (incomingData: FormData) => {
    const { email, token } = router.query;
    const fullData = {
      ...incomingData,
      email: email as string,
      token: token as string,
    };

    try {
      await resetPassword(fullData);
      router.push({
        pathname: router.pathname,
        query: {},
      });
      setTimeout(() => {
        modalSwitchSetter(true, 'showPasswordChangeSuccess');
      }, 500);
    } catch (error: any) {
      router.push({
        pathname: router.pathname,
        query: {},
      });
      setTimeout(() => {
        modalSwitchSetter(false, 'showCreateNewPassword');
        modalSwitchSetter(true, 'showExpiredWarning');
      }, 500);
    }
  };

  const { mutate } = useMutation(handleResetPassword);

  const onSubmit = async (data: FormData) => {
    mutate(data);
  };

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      modalSwitchSetter(false, 'showCreateNewPassword');
    }, 500);
  };

  const handleGoToLogIn = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      modalSwitchSetter(false, 'showCreateNewPassword');
      modalSwitchSetter(true, 'showLogIn');
    }, 500);
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
    handleClose,
    handleGoToLogIn,
    t,
  };
};
export default useCreateNewPassword;
