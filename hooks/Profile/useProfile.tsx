import { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useCheckIfLoggedIn } from '@/hooks';
import { useUiContext, useQuotesContext } from '@/store';
import { ChangeUserData } from '@/types';
import { updateAvatar, updateUser, changeEmailInDatabase } from '@/services';
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
  const [showEmailInput, setShowEmailInput] = useState(false);

  const [emailSuccess, setEmailSuccess] = useState(false);

  const [passStateForConditionsBox, setPassStateForConditionsBox] = useState(0);

  const { t } = useTranslation('profile');

  const router = useRouter();
  const { status, changeEmail } = router.query;
  const locale = router.locale;

  const { logged, user } = useCheckIfLoggedIn();

  const {
    modalSwitchSetter,
    showModal,
    setShowLangDropdown,
    showLangDropdown,
    showNotifications,
    setShowNotifications,
  } = useUiContext();

  const { setQuotesData } = useQuotesContext();

  const editEmail = async (email: string) => {
    try {
      await changeEmailInDatabase(email);
      router
        .push({
          pathname: router.pathname,
          query: {},
        })
        .then(() => {
          router.reload();
        });
    } catch (error) {}
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (status === 'success') {
      setShowSuccess(true);
      timeoutId = setTimeout(() => {
        setShowSuccess(false);
        router.push({
          pathname: router.pathname,
          query: {},
        });
      }, 4000);
    }

    if (changeEmail && changeEmail.length > 0) {
      editEmail(changeEmail as string);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [status, changeEmail]);

  const methods = useForm({
    defaultValues: {
      username: '',
      password: '',
      password_confirmation: '',
      email: '',
      avatar: null,
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
    clearErrors,
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

  useEffect(() => {
    setPassStateForConditionsBox(pass.length);
  }, [pass]);

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
        clearErrors('avatar');
      } catch (error: any) {
        const errors = error.response?.data?.errors;
        for (const field in errors) {
          if (field === 'avatar') {
            setError('avatar', {
              type: 'manual',
              message: `${t('image format error')}`,
            });
          }
        }
        setSelectedAvatar('');
        return;
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

    const payload = { ...data, locale };
    try {
      await updateUser(payload);
      router.push({
        pathname: router.pathname,
        query: { status: 'successful' },
      });
      setShowPasswordInputs(false);
      setShowUsernameInput(false);
      setShowEmailInput(false);
      reset();
    } catch (error: any) {
      if (
        error?.response?.data?.message === 'The email has already been taken.'
      ) {
        setError('email', {
          type: 'manual',
          message: `${t('The email has already been taken')}`,
        });
        return;
      }
      if (error?.response?.data?.message) {
        setError('username', {
          type: 'manual',
          message: `${t('The username has already been taken')}`,
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
        clearErrors('avatar');
      } catch (error: any) {
        const errors = error.response?.data?.errors;
        for (const field in errors) {
          if (field === 'avatar') {
            setError('avatar', {
              type: 'manual',
              message: `${t('image format error')}`,
            });
          }
        }
        setSelectedAvatar('');
      }
    }
  };

  const handleCancelLg = () => {
    setShowPasswordInputs(false);
    setShowUsernameInput(false);
    setShowEmailInput(false);
    reset();
  };

  const handleBack = async (path: string) => {
    setQuotesData([]);
    router.push(`/dashboard/${path}`);
  };

  const handleOutsideClick = () => {
    if (showModal === 'showBrugerMenu') {
      modalSwitchSetter(false, 'showBrugerMenu');
    }
    if (showLangDropdown) {
      setShowLangDropdown(!showLangDropdown);
    }

    if (showNotifications) {
      setShowNotifications(!showNotifications);
    }
  };

  return {
    logged,
    user,
    modalSwitchSetter,
    showSuccess,
    setShowSuccess,
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
    passStateForConditionsBox,
    handleUpload,
    selectedAvatar,
    setSelectedAvatar,
    avatarButtonTrigger,
    showMobileAvatarModal,
    setShowMobileAvatarModal,
    submitMobileAvatarChange,
    handleCancelLg,
    handleOutsideClick,
    handleBack,
    setShowEmailInput,
    showEmailInput,
    emailSuccess,
    setEmailSuccess,
    setShowLangDropdown,
    showLangDropdown,
    showModal,
    t,
  };
};

export default useProfile;
