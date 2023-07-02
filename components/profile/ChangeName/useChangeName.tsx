import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { updateUser } from '@/services';
import { useTranslation } from 'next-i18next';

const useChangeName = () => {
  const [showNameForm, setShowNameForm] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();
  const { showUpdateName } = useUiContext();
  const { t } = useTranslation('profile');

  const { showBurger, showModal } = useUiContext();

  const methods = useForm({
    defaultValues: {
      username: '',
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

  const username = useWatch({
    control,
    name: 'username',
  });
  const applyInputStyle = (): boolean => {
    const dirty = formState.dirtyFields['username'];
    const errorMessage = errors['username']?.message;
    return (dirty && errorMessage) || errorMessage ? true : false;
  };

  const onSubmit = (): void => {
    setShowNameForm(false);
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    try {
      await updateUser({ username: username });
      setShowConfirmModal(false);
      showUpdateName(false);
      router.push({
        pathname: router.pathname,
        query: { status: 'success' },
      });
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setError('username', {
          type: 'manual',
          message: error.response.data.message,
        });
        setShowConfirmModal(false);
        setShowNameForm(true);
      }
    }
  };

  const handleOutsideClick = () => {
    if (showModal === 'showBrugerMenu') {
      showBurger(false);
    }
  };

  return {
    showUpdateName,
    applyInputStyle,
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
    t,
    handleOutsideClick,
  };
};
export default useChangeName;
