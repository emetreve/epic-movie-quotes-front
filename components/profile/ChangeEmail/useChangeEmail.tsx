import { useUiContext } from '@/store';
import { useTranslation } from 'next-i18next';
import { useForm, useWatch } from 'react-hook-form';
import { updateUser } from '@/services';
import { useRouter } from 'next/router';

const useChangeEmail = (setEmailSuccess: Function) => {
  const { modalSwitchSetter, showModal } = useUiContext();

  const router = useRouter();
  const locale = router.locale;
  const { t } = useTranslation('profile');

  const methods = useForm({
    defaultValues: {
      email: '',
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

  const handleOutsideClick = () => {
    if (showModal === 'showBrugerMenu') {
      modalSwitchSetter(false, 'showBrugerMenu');
    }
  };

  const email = useWatch({
    control,
    name: 'email',
  });
  const applyInputStyle = (): boolean => {
    const dirty = formState.dirtyFields['email'];
    const errorMessage = errors['email']?.message;
    return (dirty && errorMessage) || errorMessage ? true : false;
  };

  const onSubmit = async () => {
    try {
      await updateUser({ email: email, locale: locale });
      modalSwitchSetter(false, 'showEditEmail');
      setEmailSuccess(true);
      router.push({
        pathname: router.pathname,
        query: { status: 'success' },
      });
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setError('email', {
          type: 'manual',
          message: `${t('The username has already been taken')}`,
        });
      }
    }
  };

  return {
    handleOutsideClick,
    modalSwitchSetter,
    t,
    register,
    handleSubmit,
    errors,
    onSubmit,
    methods,
    applyInputStyle,
    email,
    formState,
  };
};
export default useChangeEmail;
