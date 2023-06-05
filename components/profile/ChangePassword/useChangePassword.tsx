import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { updateUser } from '@/services';

const useChangePassword = () => {
  const [showPassForm, setShowPassForm] = useState(true);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const router = useRouter();
  const { showUpdatePassword } = useUiContext();

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
    formState,
    control,
  } = methods;

  const [pass, pass_confirmation] = useWatch({
    control,
    name: ['password', 'password_confirmation'],
  });

  const applyStylePass = (): boolean => {
    const dirty = formState.dirtyFields['password'];
    const errorMessage = errors['password']?.message;
    return (dirty && errorMessage) || errorMessage ? true : false;
  };
  const applyStyleConfirm = (): boolean => {
    const dirty = formState.dirtyFields['password_confirmation'];
    const errorMessage = errors['password_confirmation']?.message;
    return (dirty && errorMessage) || errorMessage ? true : false;
  };

  const onSubmit = (): void => {
    setShowPassForm(false);
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    console.log(pass, pass_confirmation);
    try {
      const response = await updateUser({
        password: pass,
        password_confirmation: pass_confirmation,
      });
      console.log(response);
      setShowConfirmModal(false);
      showUpdatePassword(false);
      router.push({
        pathname: router.pathname,
        query: { status: 'success' },
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    showUpdatePassword,
    applyStylePass,
    applyStyleConfirm,
    methods,
    register,
    formState,
    errors,
    onSubmit,
    handleSubmit,
    showConfirmModal,
    setShowConfirmModal,
    handleConfirm,
    pass,
    hidePassword,
    setHidePassword,
    hidePasswordConfirm,
    setHidePasswordConfirm,
    showPassForm,
    setShowPassForm,
  };
};
export default useChangePassword;
