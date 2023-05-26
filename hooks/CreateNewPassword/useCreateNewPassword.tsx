import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FormData } from './types';
import { useMutation } from 'react-query';
import { useUiContext } from '@/store';
import { resetPassword } from '@/services';

const useCreateNewPassword = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const { showSetNewPassword, showLog, showPasswordSuccess } = useUiContext();
  const router = useRouter();

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
    watch,
    formState,
  } = methods;

  const password = watch('password');

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
        showPasswordSuccess(true);
      }, 500);
    } catch (error) {
      console.log(error);
      // TODO: Show field errors to frontend under relevant inputs.
      // TODO: also handle "This password reset token is invalid." response (SHOW EXPIRED MODAL)
    }
  };

  const { mutate } = useMutation(handleResetPassword);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    mutate(data);
  };

  const handleClose = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      showSetNewPassword(false);
    }, 500);
  };

  const handleGoToLogIn = () => {
    router.push({
      pathname: router.pathname,
      query: {},
    });
    setTimeout(() => {
      showSetNewPassword(false);
      showLog(true);
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
  };
};
export default useCreateNewPassword;
