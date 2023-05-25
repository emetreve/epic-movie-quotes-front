import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { ForgotPasswordFormData } from '@/types';
import { useUiContext } from '@/store';
import { forgotPassword } from '@/services';

const useForgotPassword = () => {
  const { showLog, showForgot } = useUiContext();

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
  } = methods;

  const applyInputStyle = () => {
    const dirty = formState.dirtyFields['email'];
    const errorMessage = errors['email']?.message;

    return (dirty && errorMessage) || errorMessage ? true : false;
  };

  const handleForgotPassword = async (incomingData: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword(incomingData);
      console.log(response);
    } catch (error) {
      console.log(error);
      // TODO: Show error under email input
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
  };
};
export default useForgotPassword;
