import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { AddCommentData } from '@/types';
import { createComment } from '@/services';

const useNewsItem = () => {
  const { register, handleSubmit, reset } = useForm<AddCommentData>();

  const queryClient = useQueryClient();

  const createCommentMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('quotes');
    },
  });

  const onSubmit = async (data: AddCommentData) => {
    try {
      await createCommentMutation.mutateAsync(data);
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return { register, handleSubmit, onSubmit };
};
export default useNewsItem;
