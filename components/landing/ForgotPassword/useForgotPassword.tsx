import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { ForgotPasswordFormData } from '@/types';
import { useUiContext } from '@/store';
import { forgotPassword } from '@/services';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const useForgotPassword = () => {
  const { showLog, showForgot, showCheckEmailPassword } = useUiContext();
  const { t } = useTranslation('landing');

  const router = useRouter();

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
    trigger,
    reset,
    formState,
    setError,
  } = methods;

  const applyInputStyle = () => {
    const dirty = formState.dirtyFields['email'];
    const errorMessage = errors['email']?.message;

    return (dirty && errorMessage) || errorMessage ? true : false;
  };

  const handleForgotPassword = async (incomingData: ForgotPasswordFormData) => {
    try {
      if (router.locale === 'ka') {
        await forgotPassword(incomingData, 'ka');
      } else {
        await forgotPassword(incomingData);
      }
      showForgot(false);
      showCheckEmailPassword(true);
    } catch (error: any) {
      if (error.response.data.errors.email) {
        setError('email', {
          type: 'manual',
          message: error.response.data.errors.email[router.locale as string],
        });
      }
    }
  };

  const { mutate } = useMutation(handleForgotPassword);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    mutate(data);
  };

  const handleClick = () => {
    showForgot(false);
    showLog(true);
  };

  return {
    handleSubmit,
    register,
    errors,
    trigger,
    onSubmit,
    reset,
    applyInputStyle,
    formState,
    methods,
    handleClick,
    showForgot,
    t,
  };
};
export default useForgotPassword;
