import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useUiContext } from '@/store';
import { updateUser } from '@/services';

const useChangeName = () => {
  const [showNameForm, setShowNameForm] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();
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

  const handleConfirm = async () => {
    console.log(username);
    //TODO: make request to server to change username and if successsful show success banner
    try {
      const response = await updateUser({ username: username });
      console.log(response);
      setShowConfirmModal(false);
      showUpdateName(false);
      router.reload();
    } catch (error: any) {
      console.log(error);
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
  };
};
export default useChangeName;
