import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { AddCommentData } from '@/types';
import {
  createComment,
  getLike,
  broadcastLike,
  broadcastComment,
} from '@/services';

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
      broadcastComment(data.user_id, data.quote_id);
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  const handleLike = async (authUserId: number, quote_id: number) => {
    try {
      await getLike(authUserId, quote_id);
      queryClient.invalidateQueries('quotes');
      await broadcastLike(authUserId, quote_id);
    } catch (error) {
      console.log(error);
    }
  };

  return { register, handleSubmit, onSubmit, handleLike };
};
export default useNewsItem;
