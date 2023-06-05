import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useUiContext } from '@/store';

const useChangeName = () => {
  const [showNameForm, setShowNameForm] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { showUpdateName } = useUiContext();

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

  const handleConfirm = () => {
    console.log(username);
    //TODO: make request to server to change username and if successsful show success banner
    setShowConfirmModal(false);
    showUpdateName(false);
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
  };
};
export default useChangeName;
