import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';
import { ChangeUserData } from '@/types';

const useProfile = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirmation, setHidePasswordConfirmation] =
    useState(true);

  const router = useRouter();
  const { status } = router.query;

  const { logged, user } = useCheckIfLoggedIn();

  const { showEditName, showUpdateName, showUpdatePassword, showEditPassword } =
    useUiContext();

  useEffect(() => {
    if (status === 'success') {
      setShowSuccess(true);
    }
    setTimeout(() => {
      setShowSuccess(false);
      router.push({
        pathname: router.pathname,
        query: {},
      });
    }, 4000);
  }, [status]);

  const methods = useForm({
    defaultValues: {
      username: '',
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

  const applyInputStyle = (val: string): boolean => {
    const dirty = formState.dirtyFields[val as keyof ChangeUserData];
    const errorMessage = errors[val as keyof ChangeUserData]?.message;

    return (dirty && errorMessage) || errorMessage ? true : false;
  };

  const [pass, pass_confirmation] = useWatch({
    control,
    name: ['password', 'password_confirmation'],
  });

  const onSubmit = (data): void => {
    // setShowNameForm(false);
    // setShowConfirmModal(true);
    console.log(data);
  };

  return {
    logged,
    user,
    showEditName,
    showUpdateName,
    showSuccess,
    setShowSuccess,
    showUpdatePassword,
    showEditPassword,
    showUsernameInput,
    setShowUsernameInput,
    methods,
    handleSubmit,
    onSubmit,
    register,
    showPasswordInputs,
    setShowPasswordInputs,
    formState,
    applyInputStyle,
    hidePassword,
    setHidePassword,
    hidePasswordConfirmation,
    setHidePasswordConfirmation,
    errors,
    pass,
  };
};

export default useProfile;
