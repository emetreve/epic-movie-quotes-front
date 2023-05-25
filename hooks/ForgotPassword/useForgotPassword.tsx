import { useForm } from 'react-hook-form';
import { FormData } from './types';
import { useUiContext } from '@/store';

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

  const onSubmit = (data: FormData): void => {
    console.log(data);
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
