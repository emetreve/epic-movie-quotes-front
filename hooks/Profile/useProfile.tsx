import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';
import { ChangeUserData } from '@/types';
import { updateUser } from '@/services';

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

  const pass = useWatch({
    control,
    name: 'password',
  });

  const onSubmit = async (data: ChangeUserData) => {
    for (const key in data) {
      if (data[key as keyof ChangeUserData] === '') {
        delete data[key as keyof ChangeUserData];
      }
    }

    const keys = Object.keys(data);
    if (keys.length === 0) {
      return;
    }

    try {
      const response = await updateUser(data);
      console.log(response);
      router.reload();
    } catch (error: any) {
      console.log(error);
      if (error?.response?.data?.message) {
        setError('username', {
          type: 'manual',
          message: error.response.data.message,
        });
      }
    }
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
