import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { updateUser } from '@/services';
import { ChangeUserData } from '@/types';

const useChangePassword = () => {
  const [showNameForm, setShowNameForm] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
    setError,
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
    // setShowNameForm(false);
    // setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    console.log(pass, pass_confirmation);
    // try {
    //   const response = await updateUser({ username: username });
    //   console.log(response);
    //   setShowConfirmModal(false);
    //   showUpdateName(false);
    //   router.push({
    //     pathname: router.pathname,
    //     query: { status: 'success' },
    //   });
    // } catch (error: any) {
    //   console.log(error);
    //   if (error?.response?.data?.message) {
    //     setError('username', {
    //       type: 'manual',
    //       message: error.response.data.message,
    //     });
    //     setShowConfirmModal(false);
    //     setShowNameForm(true);
    //   }
    // }
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
    showNameForm,
    showConfirmModal,
    setShowConfirmModal,
    setShowNameForm,
    handleConfirm,
    pass,
    pass_confirmation,
  };
};
export default useChangePassword;
