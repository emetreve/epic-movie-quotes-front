import { useForm } from 'react-hook-form';
import { AddCommentData } from '@/types';
import { createComment, getLike } from '@/services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { getQuote } from '@/services';

const useViewQuote = (whichQuoteToView: number) => {
  const { register, handleSubmit, reset } = useForm<AddCommentData>();

  const router = useRouter();
  const queryClient = useQueryClient();

  const fetchQuote = async () => {
    try {
      const response = await getQuote(whichQuoteToView);
      return response.data;
    } catch {
      router.push('/404');
    }
  };

  const { data: quote } = useQuery('quote', fetchQuote, {
    enabled: !!whichQuoteToView,
  });

  const createCommentMutation = useMutation(createComment);

  const onSubmit = async (data: AddCommentData) => {
    try {
      createCommentMutation.mutateAsync(data);
      queryClient.invalidateQueries('quote');
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  const handleLike = async (authUserId: number, quote_id: number) => {
    try {
      await getLike(authUserId, quote_id);
      queryClient.invalidateQueries('quote');
    } catch (error) {
      console.log(error);
    }
  };

  const handleBringScroll = () => {
    document.body.classList.remove('screenHeight');
  };

  console.log(quote);
  return {
    handleBringScroll,
    register,
    handleSubmit,
    quote,
    onSubmit,
    handleLike,
  };
};
export default useViewQuote;
