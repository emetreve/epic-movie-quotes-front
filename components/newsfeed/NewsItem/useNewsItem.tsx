import { useForm } from 'react-hook-form';
import { AddCommentData } from '@/types';

const useNewsItem = () => {
  const { register, handleSubmit, reset } = useForm<AddCommentData>();

  const onSubmit = (data: AddCommentData) => {
    console.log(data);
    reset();
  };

  return { register, handleSubmit, onSubmit };
};
export default useNewsItem;
