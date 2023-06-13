import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext } from '@/store';
import { ChangeUserData } from '@/types';
import { updateAvatar, updateUser } from '@/services';
import { useTranslation } from 'next-i18next';

const useProfile = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirmation, setHidePasswordConfirmation] =
    useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [avatarButtonTrigger, setAvatarButtonTrigger] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMobileAvatarModal, setShowMobileAvatarModal] = useState(false);

  const { t } = useTranslation('profile');

  const router = useRouter();
  const { status } = router.query;

  const { logged, user } = useCheckIfLoggedIn();

  const {
    showEditName,
    showUpdateName,
    showUpdatePassword,
    showEditPassword,
    showBrugerMenu,
    showBurger,
  } = useUiContext();

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
    reset,
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
    if (selectedFile) {
      const formData = new FormData();
      formData.append('avatar', selectedFile, selectedFile.name);
      try {
        await updateAvatar(formData);
        router.push({
          pathname: router.pathname,
          query: { status: 'successful' },
        });
        setAvatarButtonTrigger(false);
      } catch (error: any) {
        console.log(error);
      }
    }

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
      await updateUser(data);
      router.push({
        pathname: router.pathname,
        query: { status: 'successful' },
      });
      setShowPasswordInputs(false);
      setShowUsernameInput(false);
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

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const selectedFile = event.target.files[0];
    setSelectedFile(selectedFile);
    if (selectedFile) {
      setSelectedAvatar(URL.createObjectURL(selectedFile));
      setAvatarButtonTrigger(true);
    }
  };

  const submitMobileAvatarChange = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('avatar', selectedFile, selectedFile.name);
      try {
        await updateAvatar(formData);
        router.push({
          pathname: router.pathname,
          query: { status: 'success' },
        });
        setAvatarButtonTrigger(false);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const handleCancelLg = () => {
    setShowPasswordInputs(false);
    setShowUsernameInput(false);
    reset();
  };

  const handleOutsideClick = () => {
    if (showBrugerMenu) {
      showBurger(false);
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
    handleUpload,
    selectedAvatar,
    setSelectedAvatar,
    avatarButtonTrigger,
    showMobileAvatarModal,
    setShowMobileAvatarModal,
    submitMobileAvatarChange,
    handleCancelLg,
    handleOutsideClick,
    t,
  };
};

export default useProfile;
