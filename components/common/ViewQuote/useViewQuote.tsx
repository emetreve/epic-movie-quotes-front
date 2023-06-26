import { useForm } from 'react-hook-form';
import { AddCommentData } from '@/types';
import { createComment, getLike, deleteQuote } from '@/services';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { getQuote } from '@/services';

const useViewQuote = (
  whichQuoteToView: number,
  setWhichQuoteToView: Function
) => {
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

  const onSubmit = async (data: AddCommentData) => {
    try {
      createComment(data);
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

  const handleDelete = async (id: number) => {
    await deleteQuote(id);
    setWhichQuoteToView(null);
    handleBringScroll();
  };

  const handleClose = () => {
    setWhichQuoteToView(null);
    handleBringScroll();
  };

  const { data: quote } = useQuery('quote', fetchQuote, {
    enabled: !!whichQuoteToView,
  });

  return {
    handleBringScroll,
    register,
    handleSubmit,
    quote,
    onSubmit,
    handleLike,
    handleDelete,
    handleClose,
  };
};
export default useViewQuote;
